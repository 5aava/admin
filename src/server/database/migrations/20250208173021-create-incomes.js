'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Incomes', {
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
        type: Sequelize.DECIMAL(15,2)
      },
      q2: {
        type: Sequelize.DECIMAL(15,2)
      },
      q3: {
        type: Sequelize.DECIMAL(15,2)
      },
      q4: {
        type: Sequelize.DECIMAL(15,2)
      },
      total: {
        type: Sequelize.DECIMAL(15,2)
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
    await queryInterface.dropTable('Incomes');
  }
};
