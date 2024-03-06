"use strict";
const { Model } = require("sequelize");
const transaksi = require("./transaksi");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi, {
        foreignKey:"id_user", as:"userTransaksi"
      })
    }
  }
  user.init(
    {
      userID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
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
