//Utils
const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

//Models
const { Users } = require("../Models/users.model");
const { Orders } = require("../Models/orders.model");
const { Restaurants } = require("../Models/restaurants.model");
const { Meals } = require("../Models/meals.model");
const { Reviews } = require("../Models/reviews.model");

const newOrder = catchAsync(async (req, res, next) => {
  const { meal, userSession } = req;

  const { quantity } = req.body;
  const totalPrice = quantity * meal.price;
  const newOrder = await Orders.create({
    mealId: meal.id,
    userId: userSession.id,
    totalPrice,
    quantity,
  });

  res.status(201).json({
    status: "created succes",
    newOrder,
  });
});
const getOrdersByUser = catchAsync(async (req, res, next) => {
  const { userSession } = req;
  const orders = await Orders.findAll({
    where: { userId: userSession.id },
    include: {
      model: Meals,
      attributes: ["name", "price"],
      include: { model: Restaurants, attributes: ["name", "address"] },
    },
  });

  res.status(200).json({
    status: "success!!",
    orders,
  });
});
const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "completed" });

  res.status(204).json({
    sutatus: "success!",
  });
});
const deletedOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(204).json({
    sutatus: "success!",
  });
});

module.exports = { newOrder, getOrdersByUser, updateOrder, deletedOrder };
