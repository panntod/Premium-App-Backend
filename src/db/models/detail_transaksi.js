"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.transaksi, {
        foreignKey: "transaksiID",
        as: "transaksi",
      });
    }
  }
  detail_transaksi.init(
    {
      detail_transaksiID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_transaksi: DataTypes.INTEGER,
      id_aplikasi: DataTypes.INTEGER,
      harga: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      total_harga: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "detail_transaksi",
    }
  );
  return detail_transaksi;
};
