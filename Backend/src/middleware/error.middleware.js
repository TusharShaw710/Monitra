
import { env } from '../config/env.js';

const { nodeEnv } = env;

export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(err, req, res, next) {
  const statusCode =
    Number.isInteger(err.statusCode) &&
    err.statusCode >= 400 &&
    err.statusCode < 600
      ? err.statusCode
      : 500;

  const message =
    statusCode === 500 && nodeEnv === 'production'
      ? 'Internal server error'
      : err.message || 'Internal server error';

  if (statusCode === 500 && nodeEnv !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}
