"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class aplikasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tier, { foreignKey: "tierID", as: "tier" });
      this.hasMany(models.transaksi, {
        foreignKey: "transakiID",
        as: "transaksi",
      });
    }
  }
  aplikasi.init(
    {
      appId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: DataTypes.STRING,
      tier: DataTypes.STRING,
      image: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "aplikasi",
    }
  );
  return aplikasi;
};
