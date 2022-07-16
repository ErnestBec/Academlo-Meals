const { body } = require("express-validator");

//Middleweares
const { checkResult } = require("../middlewares/checkResult.middleware");

const mealsValidator = [
  body("name").notEmpty().withMessage("The name cannot be empty"),
  body("price")
    .custom((value) => {
      if (value < 0) {
        throw new Error("The price must be positive");
      }
      return true;
    })
    .isNumeric()
    .withMessage("the price must be numeric")
    .notEmpty()
    .withMessage("The price cannot be empty"),
  checkResult,
];

module.exports = { mealsValidator };
