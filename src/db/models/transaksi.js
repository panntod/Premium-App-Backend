"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: "userID", as: "user" });
      this.belongsTo(models.aplikasi, { foreignKey: "appID", as: "aplikasi" });
      this.hasOne(models.detail_transaksi, {
        foreignKey: "detail_transaksiID",
        as: "detail",
      });
    }
  }
  transaksi.init(
    {
      transaksiID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tgl: DataTypes.DATE,
      id_user: DataTypes.INTEGER,
      id_aplikasi: DataTypes.INTEGER,
      status: DataTypes.ENUM("sudah", "belum"),
    },
    {
      sequelize,
      modelName: "transaksi",
    }
  );
  return transaksi;
};
