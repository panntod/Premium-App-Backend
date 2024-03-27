"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.transaksi, {
        foreignKey: "transaksiID",
        as: "detailTransaksi",
      });
      this.belongsTo(models.aplikasi, {
        foreignKey: "aplikasiID",
        as: "detailAplikasi",
      });
    }
  }
  detail_transaksi.init(
    {
      detail_transaksiID: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      transaksiID: DataTypes.INTEGER,
      aplikasiID: DataTypes.INTEGER,
      harga: DataTypes.BIGINT,
      durasi: DataTypes.BIGINT,
      total_harga: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "detail_transaksi",
    },
  );
  return detail_transaksi;
};
