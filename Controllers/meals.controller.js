//Utils
const { catchAsync } = require("../utils/catchAsync");

//Models
const { Restaurants } = require("../Models/restaurants.model");
const { Meals } = require("../Models/meals.model");

const newMeal = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, price } = req.body;
  const newMeal = await Meals.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  res.status(201).json({
    status: "created Success!!",
    newMeal,
  });
});
const getMealsActives = catchAsync(async (req, res, next) => {
  const mealsActives = await Meals.findAndCountAll({
    where: { status: "active" },
    include: { model: Restaurants, attributes: ["name", "address"] },
  });

  res.status(200).json({
    status: "success!!",
    mealsActives,
  });
});
const getMealsById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(201).json({
    status: "success!",
    meal,
  });
});
const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(204).json({
    status: "success!",
  });
});
const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await meal.update({ status: "deleted" });
  res.status(204).json({
    status: "success!",
  });
});

module.exports = {
  newMeal,
  getMealsActives,
  getMealsById,
  updateMeal,
  deleteMeal,
};
