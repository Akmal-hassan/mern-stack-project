import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000, // Generous capacity for high-throughput legitimate traffic (5,000 requests per IP per 15m)
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'OPTIONS' || req.path === '/api/health' || req.path === '/api/traffic-status',
  message: {
    success: false,
    error: 'API rate limit exceeded. Please slow down and try again shortly.'
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 authentication requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many login or registration attempts. Please try again after 15 minutes.'
  }
});

export const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many order submissions. Please wait a few moments before trying again.'
  }
});
