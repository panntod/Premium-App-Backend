"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class aplikasi extends Model {
    static associate(models) {
      // define association here
    }
  }
  aplikasi.init(
    {
      aplikasiId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama: DataTypes.STRING,
      tier: DataTypes.STRING,
      image: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "aplikasi",
    }
  );
  return aplikasi;
};
