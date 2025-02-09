'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contractorId: {
        type: Sequelize.INTEGER
      },
      trackId: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      },
      q1: {
        type: Sequelize.INTEGER
      },
      q1p: {
        type: Sequelize.TINYINT
      },
      q2: {
        type: Sequelize.INTEGER
      },
      q2p: {
        type: Sequelize.TINYINT
      },
      q3: {
        type: Sequelize.INTEGER
      },
      q3p: {
        type: Sequelize.TINYINT
      },
      q4: {
        type: Sequelize.INTEGER
      },
      q4p: {
        type: Sequelize.TINYINT
      },
      total: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};