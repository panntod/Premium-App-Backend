"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tier extends Model {
    static associate(models) {
      // define association here
    }
  }
  tier.init(
    {
      tierID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      harga: DataTypes.STRING,
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tier",
    }
  );
  return tier;
};
