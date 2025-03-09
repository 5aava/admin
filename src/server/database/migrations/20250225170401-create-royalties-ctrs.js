'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoyaltiesCtrs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      royaltyId: {
        type: Sequelize.INTEGER
      },
      trackId: {
        type: Sequelize.INTEGER
      },
      dopContractorId: {
        type: Sequelize.INTEGER
      },
      percent: {
        type: Sequelize.DECIMAL(4,2)
      },
      type: {
        type: Sequelize.STRING
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
      'RoyaltiesCtrs', ['royaltyId', 'trackId', 'dopContractorId', 'type'], {unique: true},
    );

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RoyaltiesCtrs');
  }
};
