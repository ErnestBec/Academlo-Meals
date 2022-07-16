//Utils
const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

//Models
const { Restaurants } = require("../Models/restaurants.model");
const { Reviews } = require("../Models/reviews.model");
const { Users } = require("../Models/users.model");

const reviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Reviews.findOne({ where: { id } });
  if (!review) {
    return next(new AppError("The review does not exist"));
  }

  req.review = review;

  next();
});

const restauraantExist = catchAsync(async (req, res, next) => {
  let { restaurantId, id } = req.params;
  if (!id) {
    id = restaurantId;
  }
  console.log(id);
  const restaurant = await Restaurants.findOne({
    where: { id },
    include: {
      model: Reviews,
      attributes: ["comment"],
      include: { model: Users, attributes: ["name"] },
    },
  });
  if (!restaurant) {
    return next(new AppError("The restaurant does not exist"));
  }
  req.restaurant = restaurant;
  next();
});

module.exports = { restauraantExist, reviewExist };
