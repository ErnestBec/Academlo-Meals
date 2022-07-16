//Utils
const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

//Models
const { Users } = require("../Models/users.model");
const { Restaurants } = require("../Models/restaurants.model");
const { Reviews } = require("../Models/reviews.model");

const newRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurants.create({ name, address, rating });

  res.status(201).json({
    status: "created Success!!",
    newRestaurant,
  });
});

const getRestaurantsActives = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurants.findAll({
    where: { status: "active" },
    include: {
      model: Reviews,
      attributes: ["comment", "status"],
      include: { model: Users, attributes: ["name"] },
    },
  });

  if (!restaurants) {
    return next(new AppError("There are no active restaurants", 400));
  }

  res.status(200).json({
    status: "succes",
    restaurants,
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: "success!",
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;
  await restaurant.update({ name, address });

  res.status(204).json({ status: "Succes!" });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: "deleted" });

  res.status(204).json({ status: "Succes!" });
});

const newReviewByRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant, userSession } = req;
  const { comment, rating } = req.body;

  const newReview = await Reviews.create({
    userId: userSession.id,
    comment,
    restaurantId: restaurant.id,
    rating,
  });
  res.status(201).json({
    status: "created Review Success!!",
    newReview,
  });
});

const updateReviewById = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;
  await review.update({ comment, rating });

  res.status(204).json({
    status: "update Review Success!!",
  });
});

const deletedReviewById = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "deleted" });
  res.status(204).json({
    status: "update Review Success!!",
  });
});

module.exports = {
  newRestaurant,
  getRestaurantsActives,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  newReviewByRestaurant,
  updateReviewById,
  deletedReviewById,
};
