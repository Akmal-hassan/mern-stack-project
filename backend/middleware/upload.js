import fs from 'node:fs';
import path from 'node:path';

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Native Node.js multipart/form-data parser without external npm dependencies.
 * Uses global Web Request & FormData available in modern Node.js.
 */
export async function handleFileUpload(req, res, next) {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    return next();
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost';
    const fullUrl = `${protocol}://${host}${req.url}`;

    const webReq = new Request(fullUrl, {
      method: req.method,
      headers: req.headers,
      body: buffer
    });

    const formData = await webReq.formData();
    const uploadedFiles = [];
    const fields = {};

    for (const [key, value] of formData.entries()) {
      if (value && typeof value === 'object' && typeof value.arrayBuffer === 'function' && value.name) {
        // It's a file
        if (value.size > 0) {
          const extension = path.extname(value.name) || '.jpg';
          const safeBaseName = path.basename(value.name, extension).replace(/[^a-zA-Z0-9_-]/g, '_');
          const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e6)}-${safeBaseName}${extension}`;
          const diskPath = path.join(uploadsDir, uniqueFileName);

          const arrayBuffer = await value.arrayBuffer();
          fs.writeFileSync(diskPath, Buffer.from(arrayBuffer));

          const publicUrl = `/uploads/${uniqueFileName}`;
          uploadedFiles.push({
            originalName: value.name,
            fileName: uniqueFileName,
            mimeType: value.type,
            size: value.size,
            path: publicUrl
          });
        }
      } else {
        // Regular form field
        if (fields[key] === undefined) {
          fields[key] = value;
        } else if (Array.isArray(fields[key])) {
          fields[key].push(value);
        } else {
          fields[key] = [fields[key], value];
        }
      }
    }

    // Auto-parse JSON string fields if applicable
    const jsonFields = ['variants', 'storageOptions', 'colors', 'specifications', 'gallery', 'existingImages'];
    for (const jField of jsonFields) {
      if (typeof fields[jField] === 'string') {
        try {
          fields[jField] = JSON.parse(fields[jField]);
        } catch (e) {
          // keep as string if not valid JSON
        }
      }
    }

    // Cast numeric and boolean fields
    if (fields.price !== undefined) fields.price = Number(fields.price);
    if (fields.stock !== undefined) fields.stock = Number(fields.stock);
    if (fields.originalPrice !== undefined) fields.originalPrice = Number(fields.originalPrice);
    if (fields.costPrice !== undefined) fields.costPrice = Number(fields.costPrice);
    if (fields.featured !== undefined) fields.featured = String(fields.featured) === 'true';
    let combinedGallery = [];
    if (Array.isArray(fields.existingImages) && fields.existingImages.length > 0) {
      combinedGallery.push(...fields.existingImages);
    }
    if (uploadedFiles.length > 0) {
      combinedGallery.push(...uploadedFiles.map((f) => f.path));
    }
    if (combinedGallery.length > 0) {
      fields.gallery = combinedGallery.slice(0, 3);
      fields.image = fields.gallery[0];
    } else if (fields.image && !fields.gallery) {
      fields.gallery = [fields.image];
    }

    req.body = { ...req.body, ...fields };
    req.files = uploadedFiles;

    next();
  } catch (err) {
    console.error('[Upload Middleware Error]:', err);
    res.status(400).json({
      success: false,
      error: 'Failed to process multipart form-data upload: ' + err.message
    });
  }
}
