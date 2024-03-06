"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaksis", {
      transaksiID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      tgl: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      id_user: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'users',
          key:'userID'
        }
      },
      id_aplikasi: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'aplikasis',
          key:'aplikasiID'
        }
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
