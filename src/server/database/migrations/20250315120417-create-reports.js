'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      royaltyId: {
        type: Sequelize.INTEGER
      },
      totalIncomes: {
        type: Sequelize.DECIMAL(15,2)
      },
      totalPayments: {
        type: Sequelize.DECIMAL(15,2)
      },
      totalSaldo: {
        type: Sequelize.DECIMAL(15,2)
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
    await queryInterface.dropTable('Reports');
  }
};