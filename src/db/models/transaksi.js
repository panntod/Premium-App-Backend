"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "userID",
        as: "userTransaksi",
      });
      this.belongsTo(models.aplikasi, {
        foreignKey: "aplikasiID",
        as: "aplikasiTransaksi",
      });
      this.hasMany(models.detail_transaksi, {
        foreignKey: "transaksiID",
        as: "detailTransaksi",
      });
    }
  }
  transaksi.init(
    {
      transaksiID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      tgl: DataTypes.DATE,
      userID: DataTypes.INTEGER,
      aplikasiID: DataTypes.INTEGER,
      status: DataTypes.ENUM("sudah", "belum"),
    },
    {
      sequelize,
      modelName: "transaksi",
    }
  );
  return transaksi;
};
