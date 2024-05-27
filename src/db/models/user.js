const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi, {
        foreignKey: "userID",
        as: "userTransaksi",
      });
      this.hasMany(models.topup, {
        foreignKey: "userID",
        as: "userTopup",
      });
    }
  }

  user.init(
    {
      userID: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      nama: DataTypes.STRING,
      saldo: DataTypes.BIGINT,
      role: DataTypes.ENUM("user", "admin"),
    },
    {
      sequelize,
      modelName: "user",
    },
  );

  return user;
};
