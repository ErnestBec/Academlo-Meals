const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//Utils
const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

//Models
const { Users } = require("../Models/users.model");
const { Orders } = require("../Models/orders.model");
const { Restaurants } = require("../Models/restaurants.model");
const { Meals } = require("../Models/meals.model");

const getallUsers = catchAsync(async (req, res, next) => {
  const users = await Users.findAll();

  res.status(201).json({
    status: "created Success!!",
    users,
  });
});
const newUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //Password encryption
  const salt = bcryptjs.genSaltSync(12);
  const hash = bcryptjs.hashSync(password, salt);

  const newUser = await Users.create({ name, email, password: hash, role });

  newUser.password = undefined;

  res.status(201).json({
    status: "created Success!!",
    newUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //User exist
  const user = await Users.findOne({ where: { email, status: "active" } });

  if (!user) {
    return next(new AppError("Credentials Invalid", 400));
  }

  //Valid Credentials
  const passwordValid = await bcryptjs.compare(password, user.password);

  if (!passwordValid) {
    return next(new AppError("Credentials Invalid ", 400));
  }

  //Generate Token
  const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
    expiresIn: "5d",
  });

  res.status(201).json({
    status: "login success!!",
    token,
  });
});

const updateProfileUser = catchAsync(async (req, res, next) => {
  const { userSession } = req;
  const { name, email } = req.body;

  await userSession.update({ name, email });

  res.status(204).json({
    status: "Succes",
  });
});

const deleteProfileUser = catchAsync(async (req, res, next) => {
  const { userSession } = req;

  await userSession.update({ status: "deleted" });
  res.status(204).json({
    status: "Succes",
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
    status: "succes",
    orders,
  });
});
const getOrderById = catchAsync(async (req, res, next) => {
  const { userSession } = req;
  const { id } = req.params;

  const order = await Orders.findOne({
    where: { userId: userSession.id, id },
    include: {
      model: Meals,
      attributes: ["name", "price"],
      include: { model: Restaurants, attributes: ["name", "address"] },
    },
  });

  if (!order) {
    return next(new AppError("the order does not belong to you", 400));
  }

  res.status(201).json({
    status: "success!",
    order,
  });
});

module.exports = {
  newUser,
  updateProfileUser,
  deleteProfileUser,
  getOrdersByUser,
  getOrderById,
  login,
  getallUsers,
};
