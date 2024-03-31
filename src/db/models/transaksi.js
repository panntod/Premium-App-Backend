"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

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
      this.hasOne(models.detail_transaksi, {
        foreignKey: "transaksiID",
        as: "detailTransaksi",
      });
    }
  }
  transaksi.init(
    {
      transaksiID: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      tgl: DataTypes.DATE,
      userID: DataTypes.BIGINT,
      aplikasiID: DataTypes.BIGINT,
      status: DataTypes.ENUM("draft", "lunas"),
    },
    {
      sequelize,
      modelName: "transaksi",
    },
  );
  return transaksi;
};
