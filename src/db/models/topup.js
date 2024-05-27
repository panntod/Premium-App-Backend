"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class topup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "userID",
        as: "userTopup",
      });
    }
  }
  topup.init({
    topupID: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    userID: DataTypes.BIGINT,
    saldo: DataTypes.BIGINT,
    date: DataTypes.DATE,
    status: DataTypes.ENUM('pending', 'approved')
  }, {
    sequelize,
    modelName: 'topup',
  });
  return topup;
};