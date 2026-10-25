import zlib from 'node:zlib';

/**
 * High-performance response compression middleware using native node:zlib.
 * Handles Gzip and Deflate encoding for JSON and text payloads > 1KB.
 * Reduces bandwidth and socket buffer memory consumption by up to 80% during high-traffic surges.
 */
export function responseCompression(req, res, next) {
  const acceptEncoding = req.headers['accept-encoding'] || '';

  // Skip compression for OPTIONS or if client does not accept gzip/deflate
  if (req.method === 'OPTIONS' || !acceptEncoding) {
    return next();
  }

  const supportsGzip = acceptEncoding.includes('gzip');
  const supportsDeflate = acceptEncoding.includes('deflate');

  if (!supportsGzip && !supportsDeflate) {
    return next();
  }

  const selectedEncoding = supportsGzip ? 'gzip' : 'deflate';
  const compressMethod = supportsGzip ? zlib.gzipSync : zlib.deflateSync;

  const originalSend = res.send;
  const originalJson = res.json;

  res.json = function (body) {
    const jsonString = JSON.stringify(body);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.send(jsonString);
  };

  res.send = function (body) {
    if (res.headersSent) {
      return originalSend.call(this, body);
    }

    res.setHeader('Vary', 'Accept-Encoding');

    // Only compress strings or buffers that exceed 1KB
    const isBuffer = Buffer.isBuffer(body);
    const isString = typeof body === 'string';

    if (!isBuffer && !isString) {
      return originalSend.call(this, body);
    }

    const byteLength = isBuffer ? body.length : Buffer.byteLength(body, 'utf-8');

    if (byteLength < 1024) {
      return originalSend.call(this, body);
    }

    try {
      const bufferToCompress = isBuffer ? body : Buffer.from(body, 'utf-8');
      const compressed = compressMethod(bufferToCompress, {
        level: zlib.constants.Z_BEST_SPEED // Optimized for maximum throughput and minimum CPU latency
      });

      res.setHeader('Content-Encoding', selectedEncoding);
      res.removeHeader('Content-Length');
      res.setHeader('Content-Length', compressed.length);

      return originalSend.call(this, compressed);
    } catch (compressErr) {
      // Graceful fallback to uncompressed payload if compression encounters an issue
      console.warn('[Compression] Fallback to raw response:', compressErr.message);
      return originalSend.call(this, body);
    }
  };

  next();
}

export default responseCompression;
