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
