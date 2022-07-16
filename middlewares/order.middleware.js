//Utils
const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");
//Models
const { Orders } = require("../Models/orders.model");

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Orders.findOne({ where: { id, status: "active" } });
  if (!order) {
    return next(new AppError("the order does not exist", 400));
  }

  req.order = order;
  next();
});

module.exports = { orderExist };
