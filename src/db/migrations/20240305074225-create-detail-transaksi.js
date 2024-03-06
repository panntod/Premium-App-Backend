"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detail_transaksis", {
      detail_transaksiID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      transaksiID: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "transaksis",
          key: "transaksiID",
        },
      },
      aplikasiID: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "aplikasis",
          key: "aplikasiID",
        },
      },
      harga: {
        type: Sequelize.BIGINT,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      total_harga: {
        type: Sequelize.STRING,
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
