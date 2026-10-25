import User from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please log in to continue.'
      });
    }

    const user = await User.findById(req.session.userId).select('+role +status');
    if (!user) {
      req.session.destroy();
      return res.status(401).json({
        success: false,
        error: 'Session invalid or user account no longer exists.'
      });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        error: 'Your account has been suspended. Please contact customer support.'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export async function requireAdmin(req, res, next) {
  try {
    if (!req.session?.userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please log in as an administrator.'
      });
    }

    const user = await User.findById(req.session.userId).select('+role +status');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Session invalid or user account no longer exists.'
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: user.status === 'suspended'
          ? 'Your account has been suspended. Please contact customer support.'
          : 'Your account is not active.'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Access forbidden. Administrator privileges are required.'
      });
    }

    req.user = user;
    return next();
  } catch (err) {
    next(err);
  }
}

export async function optionalAuth(req, res, next) {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId);
      if (user && user.status === 'active') {
        req.user = user;
      }
    }
    next();
  } catch (err) {
    // If optional auth fails, continue as unauthenticated guest
    next();
  }
}
