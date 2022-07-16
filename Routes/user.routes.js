const express = require("express");

//Middlewares
const { userValidator } = require("../middlewares/userValidator.middleware");
const {
  protectSession,
  protectedAcount,
} = require("../middlewares/auth.middleware");

//Controllers
const {
  getallUsers,
  newUser,
  updateProfileUser,
  deleteProfileUser,
  getOrdersByUser,
  getOrderById,
  login,
} = require("../Controllers/users.controller");

const userRouter = express.Router();

//DefineEndpoints
userRouter.post("/signup", userValidator, newUser);
userRouter.post("/login", login);
userRouter.get("/", getallUsers);

userRouter.use(protectSession);

userRouter.get("/orders/:id", getOrderById);
userRouter.get("/orders", getOrdersByUser);

userRouter
  .route("/:id")
  .patch(protectedAcount, updateProfileUser)
  .delete(protectedAcount, deleteProfileUser);

module.exports = { userRouter };
