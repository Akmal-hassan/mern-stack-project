import app from './app.js';
import { initializeBackend } from './bootstrap.js';

export default async function handler(req, res) {
  try {
    await initializeBackend();
  } catch (err) {
    console.error('[API] Serverless initialization failed:', err.message);
    return res.status(503).json({
      success: false,
      error: 'Backend initialization failed.'
    });
  }
  return app(req, res);
}
