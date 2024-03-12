"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaksis", {
      transaksiID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4(),
      },
      tgl: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      userID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "userID",
        },
      },
      aplikasiID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "aplikasis",
          key: "aplikasiID",
        },
      },
      status: {
        type: Sequelize.ENUM("draft", "lunas"),
        defaultValue: "draft",
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
    await queryInterface.dropTable("transaksis");
  },
};
