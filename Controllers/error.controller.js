const dotenv = require("dotenv");

//utils
const { AppError } = require("../utils/AppError");

dotenv.config({ path: "./config.env" });

const sendErrorDev = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "fail",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "fail",
    message: err.message || "Error dep",
  });
};

const handleUniqueEmail = () => {
  return new AppError("The email repeat", 400);
};

const globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (err.name === "SequelizeUniqueConstraintError") {
      error = handleUniqueEmail();
    }
    sendErrorProd(error, req, res);
  }
};
module.exports = { globalErrorHandler };
