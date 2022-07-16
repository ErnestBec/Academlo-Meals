const express = require("express");
const { AppError } = require("./utils/AppError");
//Routes
const { userRouter } = require("./Routes/user.routes");
const { restaurantRoute } = require("./Routes/restaurants.routes");
const { mealRouter } = require("./Routes/melas.routes");
const { orderRouter } = require("./Routes/orders.routes");

//Init App
const app = express();
app.use(express.json());

//Constrollers
const { globalErrorHandler } = require("./Controllers/error.controller");

//Define Endopoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRoute);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/orders", orderRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});
app.use(globalErrorHandler);

module.exports = { app };
