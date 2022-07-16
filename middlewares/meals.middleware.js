//Utils
const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

//Models
const { Meals } = require("../Models/meals.model");
const { Restaurants } = require("../Models/restaurants.model");

const mealExist = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  const { mealId } = req.body;

  if (!id) {
    id = mealId;
  }
  const meal = await Meals.findOne({
    where: { id, status: "active" },
    include: { model: Restaurants, attributes: ["name", "address"] },
  });

  if (!meal) {
    return next(new AppError("the meal does not exist", 400));
  }

  req.meal = meal;
  next();
});

module.exports = { mealExist };
