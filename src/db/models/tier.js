"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tier extends Model {
    static associate(models) {
      // define association here
      this.hasOne(models.aplikasi, {
        foreignKey: "tierID",
        as: "aplikasiTier",
      });
      this.hasMany(models.detail_transaksi, {
        foreignKey: "tierID",
        as: "detailTier",
      });
    }
  }
  tier.init(
    {
      tierID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      harga: DataTypes.BIGINT,
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tier",
    }
  );
  return tier;
};
