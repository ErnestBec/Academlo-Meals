const { db, DataTypes } = require("../utils/database.utils");

const Users = db.define("users", {
  id: {
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Users };
