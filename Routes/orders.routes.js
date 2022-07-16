const express = require("express");

//Middleweares
const {
  protectSession,
  protectedOrder,
} = require("../middlewares/auth.middleware");
const { mealExist } = require("../middlewares/meals.middleware");
const { orderValidator } = require("../middlewares/orderValidator.middleware");
const { orderExist } = require("../middlewares/order.middleware");

//Controllers
const {
  newOrder,
  getOrdersByUser,
  updateOrder,
  deletedOrder,
} = require("../Controllers/orders.controller");

const orderRouter = express.Router();

//Define Endpoints
orderRouter.use(protectSession);

orderRouter.post("/", orderValidator, mealExist, newOrder);
orderRouter.get("/me", getOrdersByUser);
orderRouter.patch("/:id", orderExist, protectedOrder, updateOrder);
orderRouter.delete("/:id", orderExist, protectedOrder, deletedOrder);

module.exports = { orderRouter };
