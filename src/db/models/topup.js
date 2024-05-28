"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class topup extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "username",
        as: "userTopup",
      });
    }
  }
  topup.init(
    {
      topupID: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      username: DataTypes.STRING,
      saldo: DataTypes.BIGINT,
      date: DataTypes.DATE,
      status: DataTypes.ENUM("pending", "approved"),
    },
    {
      sequelize,
      modelName: "topup",
    }
  );
  return topup;
};
