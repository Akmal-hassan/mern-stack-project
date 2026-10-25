/**
 * High-Traffic Concurrency Controller & Request Queueing / Throttling Middleware
 * Protects BlueBells Express backend against massive surges (1,000 to 10,000 users/sec)
 * Prevents socket exhaustion, event-loop starvation, and Node.js Out-Of-Memory (OOM) crashes.
 */

const MAX_CONCURRENT_REQUESTS = 1000;
const MAX_QUEUE_CAPACITY = 3000;
const QUEUE_TIMEOUT_MS = 3500;

let activeRequests = 0;
const pendingQueue = [];
let totalRequestsServed = 0;
let totalRequestsShed = 0;

function processNext() {
  if (activeRequests >= MAX_CONCURRENT_REQUESTS || pendingQueue.length === 0) {
    return;
  }

  const nextJob = pendingQueue.shift();
  if (!nextJob) return;

  // Clear timeout timer if still pending
  clearTimeout(nextJob.timeoutId);

  // If client already disconnected while in queue, skip to next
  if (nextJob.req.destroyed || nextJob.res.writableEnded) {
    return processNext();
  }

  activeRequests++;
  nextJob.dispatch();
}

export function trafficThrottler(req, res, next) {
  // Always allow health checks and preflight OPTIONS to pass instantly
  if (req.method === 'OPTIONS' || req.path === '/api/health' || req.path === '/api/traffic-status') {
    return next();
  }

  // Register cleanup when response concludes
  const onComplete = () => {
    res.removeListener('finish', onComplete);
    res.removeListener('close', onComplete);
    activeRequests = Math.max(0, activeRequests - 1);
    totalRequestsServed++;
    processNext();
  };

  // Case 1: Within safe concurrency limit - execute immediately
  if (activeRequests < MAX_CONCURRENT_REQUESTS && pendingQueue.length === 0) {
    activeRequests++;
    res.on('finish', onComplete);
    res.on('close', onComplete);
    return next();
  }

  // Case 2: Concurrency reached, but queue has space - buffer safely
  if (pendingQueue.length < MAX_QUEUE_CAPACITY) {
    let hasDispatched = false;

    const timeoutId = setTimeout(() => {
      if (hasDispatched) return;
      hasDispatched = true;

      // Remove from queue if still present
      const index = pendingQueue.findIndex((job) => job.timeoutId === timeoutId);
      if (index > -1) {
        pendingQueue.splice(index, 1);
      }

      totalRequestsShed++;
      if (!res.headersSent) {
        res.setHeader('Retry-After', '1');
        return res.status(503).json({
          success: false,
          error: 'Server is currently experiencing extremely high traffic. Please retry in a moment.',
          retryAfter: 1
        });
      }
    }, QUEUE_TIMEOUT_MS);

    pendingQueue.push({
      req,
      res,
      timeoutId,
      dispatch: () => {
        if (hasDispatched) return;
        hasDispatched = true;
        res.on('finish', onComplete);
        res.on('close', onComplete);
        next();
      }
    });

    return;
  }

  // Case 3: Traffic surge (> 4,000 in-flight requests simultaneously)
  // Perform immediate graceful load-shedding to prevent process crash
  totalRequestsShed++;
  res.setHeader('Retry-After', '1');
  return res.status(429).json({
    success: false,
    error: 'Traffic surge detected: 1,000–10,000 users active per second. Please retry shortly.',
    retryAfter: 1
  });
}

export function getTrafficMetrics() {
  return {
    activeConcurrentRequests: activeRequests,
    queuedRequests: pendingQueue.length,
    maxConcurrentAllowed: MAX_CONCURRENT_REQUESTS,
    queueCapacity: MAX_QUEUE_CAPACITY,
    totalRequestsServed,
    totalRequestsShed,
    serverHealth: activeRequests < MAX_CONCURRENT_REQUESTS ? 'optimal' : 'throttling-active'
  };
}

export default trafficThrottler;
