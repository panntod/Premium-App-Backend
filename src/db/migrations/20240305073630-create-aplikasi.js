"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("aplikasis", {
      aplikasiID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4(),
      },
      nama: {
        type: Sequelize.STRING,
      },
      tierID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tiers",
          key: "tierID",
        },
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
