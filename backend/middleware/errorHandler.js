export function errorHandler(err, req, res, next) {
  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

  // Handle Mongoose duplicate key error (11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const val = err.keyValue ? err.keyValue[field] : '';
    return res.status(409).json({
      success: false,
      error: `A record with this ${field} ("${val}") already exists.`
    });
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Invalid resource identifier format for '${err.path}'.`
    });
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: messages[0] || 'Validation error occurred.',
      details: messages
    });
  }

  console.error(`[Error] ${req.method} ${req.url} - ${err.message}`, !isProduction ? err.stack : '');

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error. Please try again later.',
    ...(isProduction ? {} : { stack: err.stack })
  });
}
