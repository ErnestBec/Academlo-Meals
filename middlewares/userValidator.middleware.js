const { body } = require("express-validator");

//Middlewares
const { checkResult } = require("../middlewares/checkResult.middleware");

const userValidator = [
  body("name").notEmpty().withMessage("The name cannot be empty"),
  body("email")
    .notEmpty()
    .withMessage("The name cannot be empty")
    .isEmail()
    .withMessage("The email is invalid"),
  body("password")
    .notEmpty()
    .withMessage("The password cannot be emmty")
    .isAlphanumeric()
    .withMessage("The password must contain numbers and characters")
    .isLength({ min: 8 })
    .withMessage("The password must contain at least 8 characters"),
  body("role")
    .notEmpty()
    .withMessage("The role cannot be empty")
    .custom((value) => {
      let role;
      if (value === "admin") {
        role = value;
        return true;
      } else if (value === "normal") {
        return true;
      }
      throw new Error("The role is invalid");
    }),
  checkResult,
];

module.exports = { userValidator };
