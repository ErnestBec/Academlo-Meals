const { body } = require("express-validator");
const { AppError } = require("../utils/AppError");

//Middlewares
const { checkResult } = require("../middlewares/checkResult.middleware");

const restaurantValudator = [
  body("name").notEmpty().withMessage("The name cannot be empty"),
  body("address").notEmpty().withMessage("The address cannot be empty"),
  body("rating")
    .custom((value) => {
      if (value < 0) {
        throw new Error("The rating must be positive");
      }
      return true;
    })
    .isNumeric()
    .withMessage("the rating must be numeric")
    .notEmpty()
    .withMessage("The rating cannot be empty"),
  checkResult,
];
const restaurantReviewsValidator = [
  body("comment").notEmpty().withMessage("The comment cannot be empty"),
  body("rating").isNumeric().withMessage("the rating must be numeric"),
  checkResult,
];

module.exports = { restaurantValudator, restaurantReviewsValidator };
