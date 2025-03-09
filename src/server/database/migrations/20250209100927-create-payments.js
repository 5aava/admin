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
        type: Sequelize.DECIMAL(15,2)
      },
      q1p: {
        type: Sequelize.TINYINT
      },
      q2: {
        type: Sequelize.DECIMAL(15,2)
      },
      q2p: {
        type: Sequelize.TINYINT
      },
      q3: {
        type: Sequelize.DECIMAL(15,2)
      },
      q3p: {
        type: Sequelize.TINYINT
      },
      q4: {
        type: Sequelize.DECIMAL(15,2)
      },
      q4p: {
        type: Sequelize.TINYINT
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

    await queryInterface.addIndex(
      'Payments', ['contractorId', 'trackId', 'year'], {unique: true},
    );

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};
