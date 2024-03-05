"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    static associate(models) {
      // define association here
    }
  }
  transaksi.init(
    {
      transaksiID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tgl: DataTypes.DATE,
      id_user: DataTypes.INTEGER,
      id_aplikasi: DataTypes.INTEGER,
      status: DataTypes.ENUM("sudah", "belum"),
    },
    {
      sequelize,
      modelName: "transaksi",
    }
  );
  return transaksi;
};
