import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import signature from 'cookie-signature';
import { connectDB } from './config/db.js';
import { createSessionMiddleware, getSessionSecret } from './config/session.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const configuredOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS || '').split(',')
].map((value) => value?.trim()).filter(Boolean).map((value) => new URL(value).origin);
const allowedOrigins = new Set([
  'https://bluebells-vv44.vercel.app',
  ...configuredOrigins,
  ...(!isProduction ? [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ] : [])
]);

const app = express();
if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);
function isAllowedOrigin(origin) {
  if (!origin) return true;
  return allowedOrigins.has(origin);
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
  })
);

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BlueBells API is running'
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});
app.use('/api/', generalLimiter);

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

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    dbState: 'connected'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/brands', (req, res) => res.redirect('/api/products/brands'));
app.get('/api/categories', (req, res) => res.redirect('/api/products/categories'));

app.use(errorHandler);


export default app;
