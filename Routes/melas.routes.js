const express = require("express");

//Middleweares
const {
  protectSession,
  userIdAdmin,
} = require("../middlewares/auth.middleware");
const { restauraantExist } = require("../middlewares/restaurant.middleware");
const { mealsValidator } = require("../middlewares/mealsValidator.middleweare");
const { mealExist } = require("../middlewares/meals.middleware");

//controllers
const {
  newMeal,
  getMealsActives,
  getMealsById,
  updateMeal,
  deleteMeal,
} = require("../Controllers/meals.controller");

const mealRouter = express.Router();

//Define Endpoints
mealRouter.get("/", getMealsActives);
mealRouter.get("/:id", mealExist, getMealsById);

mealRouter.use(protectSession);
mealRouter
  .route("/:id")
  .post(userIdAdmin, mealsValidator, restauraantExist, newMeal)
  .patch(userIdAdmin, mealExist, updateMeal)
  .delete(userIdAdmin, mealExist, deleteMeal);

module.exports = { mealRouter };
