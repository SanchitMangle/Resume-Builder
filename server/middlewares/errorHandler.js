import logger from "../config/logger.js";

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const errorHandler = (err, req, res, next) => {
  logger.error(
    {
      err: err?.message || err,
      stack: err?.stack,
      method: req.method,
      url: req.originalUrl,
      userId: req.userId,
    },
    "Unhandled error"
  );

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
  });
};
