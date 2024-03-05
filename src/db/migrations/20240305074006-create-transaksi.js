"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaksis", {
      transaksiID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tgl: {
        type: Sequelize.DATE,
      },
      id_user: {
        type: Sequelize.INTEGER,
      },
      id_aplikasi: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM("sudah", "belum"),
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
