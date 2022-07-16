const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//Utils
const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");
//Models
const { Users } = require("../Models/users.model");

const protectSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Invalid token", 403));
  }

  const decode = jwt.verify(token, process.env.SECRET_JWT);

  //User Session
  const userSession = await Users.findOne({
    where: { id: decode.id, status: "active" },
  });

  if (!userSession) {
    return next(
      new AppError("The owner of this token doesnt exist anymore", 403)
    );
  }

  req.userSession = userSession;

  next();
});

const protectedAcount = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userSession } = req;

  if (userSession.id != id) {
    return next(new AppError("Can you only modify your account"), 403);
  }
  next();
});

const userIdAdmin = catchAsync(async (req, res, next) => {
  const { userSession } = req;

  if (userSession.role != "admin") {
    return next(new AppError("Access denied!", 401));
  }

  next();
});
const protectedReview = catchAsync(async (req, res, next) => {
  const { userSession, review } = req;
  if (userSession.id != review.userId) {
    return next(new AppError("You can only modify your comments", 401));
  }

  next();
});
const protectedOrder = catchAsync(async (req, res, next) => {
  const { userSession, order } = req;
  if (userSession.id != order.userId) {
    return next(new AppError("You can only modify your order", 401));
  }

  next();
});

module.exports = {
  protectSession,
  protectedAcount,
  userIdAdmin,
  protectedReview,
  protectedOrder,
};
