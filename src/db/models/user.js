"use strict";
const { Model } = require("sequelize");
const transaksi = require("./transaksi");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi, {
        foreignKey: "transaksiID",
        as: "transaksi",
      });
    }
  }
  user.init(
    {
      userID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      nama: DataTypes.STRING,
      role: DataTypes.ENUM("user", "admin"),
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
