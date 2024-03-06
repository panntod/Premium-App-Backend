"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.transaksi, {
        foreignKey:"id_transaksi", as:"detailTransaksi"
      })
      this.belongsTo(models.aplikasi, {
        foreignKey:"id_aplikasi", as:"detailAplikasi"
      })
    }
  }
  detail_transaksi.init(
    {
      detail_transaksiID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      id_transaksi: DataTypes.INTEGER,
      id_aplikasi: DataTypes.INTEGER,
      harga: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      total_harga: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "detail_transaksi",
    }
  );
  return detail_transaksi;
};
