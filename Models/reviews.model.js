const { db, DataTypes } = require("../utils/database.utils");

const Reviews = db.define("reviews", {
  id: {
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});

module.exports = { Reviews };
