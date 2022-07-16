const { body } = require("express-validator");
//Middlewares
const { checkResult } = require("../middlewares/checkResult.middleware");

const orderValidator = [
  body("mealId")
    .notEmpty()
    .withMessage("the mealId cannot be empty")
    .isNumeric()
    .custom((value) => {
      if (value < 0) {
        throw new Error("The mealId must be positive");
      }
      return true;
    })
    .withMessage("the mealId must be numeric"),
  body("quantity")
    .notEmpty()
    .withMessage("the quantity cannot be empty")
    .isNumeric()
    .custom((value) => {
      if (value < 0) {
        throw new Error("The quantity must be positive");
      }
      return true;
    })
    .withMessage("the quantity must be numeric"),
  checkResult,
];

module.exports = { orderValidator };
