//Models
const { Meals } = require("../Models/meals.model");
const { Orders } = require("../Models/orders.model");
const { Restaurants } = require("../Models/restaurants.model");
const { Reviews } = require("../Models/reviews.model");
const { Users } = require("../Models/users.model");

//Establish Relations

const initModels = () => {
  //1 Restaurants ----> M Reviews
  Restaurants.hasOne(Reviews, { foreignKey: "restaurantId" });
  Reviews.belongsTo(Restaurants);
  //1 Users ----> M Reviews
  Users.hasOne(Reviews, { foreignKey: "userId" });
  Reviews.belongsTo(Users),
    //1 Restaurants ----> M Meals
    Restaurants.hasOne(Meals, { foreignKey: "restaurantId" });
  Meals.belongsTo(Restaurants),
    //1 Meals ----> M Orders
    Meals.hasOne(Orders, { foreignKey: "mealId" });
  Orders.belongsTo(Meals),
    //1 Users ----> M Orders
    Users.hasOne(Orders, { foreignKey: "userId" });
};

module.exports = { initModels };
