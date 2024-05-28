"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("topups", {
      topupID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4(),
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "username",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      saldo: {
        type: Sequelize.BIGINT,
      },
      date: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: Sequelize.ENUM("pending", "approved"),
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("topups");
  },
};
