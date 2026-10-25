import http from 'node:http';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import signature from 'cookie-signature';
import { connectDB } from './config/db.js';
import { createSessionMiddleware, getSessionSecret } from './config/session.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { seedDatabase } from './scripts/seed.js';
import Product from './models/Product.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { responseCompression } from './middleware/compression.js';
import { trafficThrottler, getTrafficMetrics } from './middleware/trafficThrottler.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// HTTP socket optimization for high-concurrency throughput
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;
server.maxHeadersCount = 100;
server.requestTimeout = 30000;

const allowedOrigins = new Set(
  [
    process.env.CLIENT_URLS,
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://bluebells-vv44.vercel.app'
  ]
    .filter(Boolean)
    .flatMap((value) => value.split(',').map((origin) => origin.trim()).filter(Boolean))
);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  return allowedOrigins.has(origin);
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
  })
);

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  next();
});

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use((req, res, next) => {
  res.setHeader('Vary', 'Origin');
  next();
});

// High-traffic protection: Concurrency throttling, load-shedding, and response compression
app.use(trafficThrottler);
app.use(responseCompression);
app.use('/api', generalLimiter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BlueBells API is running' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, status: 'healthy' });
});

app.get('/api/traffic-status', (req, res) => {
  res.status(200).json({ success: true, metrics: getTrafficMetrics() });
});

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (token) {
      const secret = getSessionSecret();
      if (secret) {
        const signed = 's:' + signature.sign(token, secret);
        const existingCookie = req.headers.cookie;
        if (!existingCookie || !existingCookie.includes('bluebells.sid=')) {
          req.headers.cookie = existingCookie
            ? `${existingCookie}; bluebells.sid=${encodeURIComponent(signed)}`
            : `bluebells.sid=${encodeURIComponent(signed)}`;
        }
      }
    }
  }
  next();
});

app.use(createSessionMiddleware());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.originalUrl}`
  });
});

app.use(errorHandler);

const startup = (async () => {
  if (process.env.NODE_ENV === 'production' && (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD)) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured in production.');
  }
  await connectDB();

  try {
    const count = await Product.countDocuments({});
    if (count === 0) {
      await seedDatabase();
    }
  } catch (seedingError) {
    console.warn('[Server] Seed check failed:', seedingError.message);
  }
})();

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  startup.then(() => {
    server.listen(PORT, () => {
      console.log(`[Server] BlueBells backend running on port ${PORT}`);
    });
  });
}

export { app, server, startup };

export default app;
