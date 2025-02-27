'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Royalties', {
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
      contractId: {
        type: Sequelize.INTEGER
      },
      usnTax: {
        type: Sequelize.TINYINT
      },
      totalValByYears: {
        type: Sequelize.DECIMAL(15,2)
      },
      valMinusUsn: {
        type: Sequelize.DECIMAL(15,2)
      },
      valForGaz: {
        type: Sequelize.DECIMAL(15,2)
      },
      valForContractors: {
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
    await queryInterface.dropTable('Royalties');
  }
};
