"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detail_transaksis", {
      detail_transaksiID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4(),
      },
      transaksiID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "transaksis",
          key: "transaksiID",
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
      harga: {
        type: Sequelize.BIGINT,
      },
      durasi: {
        type: Sequelize.BIGINT,
      },
      total_harga: {
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable("detail_transaksis");
  },
};
