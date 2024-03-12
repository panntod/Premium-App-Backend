"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class aplikasi extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.tier, {
        foreignKey: "tierID",
        as: "tierAplikasi",
      });
      this.hasMany(models.detail_transaksi, {
        foreignKey: "aplikasiID",
        as: "detailTransaksiAplikasi",
      });
      this.hasMany(models.transaksi, {
        foreignKey: "aplikasiID",
        as: "transaksiAplikasi",
      });
    }
  }
  aplikasi.init(
    {
      aplikasiID: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      nama: DataTypes.STRING,
      tierID: DataTypes.BIGINT,
      image: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "aplikasi",
    },
  );
  return aplikasi;
};
