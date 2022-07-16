const express = require("express");
//Middlewares
const {
  protectSession,
  userIdAdmin,
  protectedReview,
} = require("../middlewares/auth.middleware");
const {
  restaurantValudator,
  restaurantReviewsValidator,
} = require("../middlewares/restaurantValidators.middleware");
const {
  restauraantExist,
  reviewExist,
} = require("../middlewares/restaurant.middleware");

//Controllers
const {
  newRestaurant,
  getRestaurantsActives,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  newReviewByRestaurant,
  updateReviewById,
  deletedReviewById,
} = require("../Controllers/restaurant.controller");

//Define Endpoints
const restaurantRoute = express.Router();

restaurantRoute.get("/", getRestaurantsActives);
restaurantRoute.get("/:id", restauraantExist, getRestaurantById);

restaurantRoute.use(protectSession);

restaurantRoute.post("/", restaurantValudator, userIdAdmin, newRestaurant);

restaurantRoute.post(
  "/reviews/:restaurantId",
  restauraantExist,
  restaurantReviewsValidator,
  newReviewByRestaurant
);
restaurantRoute.patch(
  "/reviews/:id",
  reviewExist,
  restaurantReviewsValidator,
  protectedReview,
  updateReviewById
);
restaurantRoute.delete(
  "/reviews/:id",
  reviewExist,
  protectedReview,
  deletedReviewById
);

restaurantRoute
  .use(userIdAdmin)
  .route("/:id")
  .patch(restauraantExist, updateRestaurant)
  .delete(restauraantExist, deleteRestaurant);

module.exports = { restaurantRoute };
