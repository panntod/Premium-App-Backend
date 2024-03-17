"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

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
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      harga: DataTypes.BIGINT,
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tier",
    },
  );

  return tier;
};
