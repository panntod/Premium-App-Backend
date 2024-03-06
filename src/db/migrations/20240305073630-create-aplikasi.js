"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("aplikasis", {
      aplikasiID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      nama: {
        type: Sequelize.STRING,
      },
      id_tier: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'tiers',
          key:'tierID'
        }
      },
      image: {
        type: Sequelize.TEXT,
      },
      deskripsi: {
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
    await queryInterface.dropTable("aplikasis");
  },
};
