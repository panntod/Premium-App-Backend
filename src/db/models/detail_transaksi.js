"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    static associate(models) {
      // define association here
    }
  }
  detail_transaksi.init(
    {
      detail_transaksiID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_transaksi: DataTypes.INTEGER,
      id_aplikasi: DataTypes.INTEGER,
      harga: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      total_harga: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "detail_transaksi",
    }
  );
  return detail_transaksi;
};
