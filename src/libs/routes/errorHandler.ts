export let errorHandler = (err, req, res, next) => {
  err.status = 500;
  err.message = "error";

  res.status(err.status).json({
    error: "Not Found",
    status: err.status,
    message: err.message,
    timestamp: Date.now(),
  });
};
