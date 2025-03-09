'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContractsCtrs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contractId: {
        type: Sequelize.INTEGER,
        /* onDelete: 'RESTRICT',
        references: {
          model: 'Contracts',
          key: 'id',
        }, */
      },
      contractorId: {
        type: Sequelize.INTEGER,
        /* onDelete: 'RESTRICT',
        references: {
          model: 'Contractors',
          key: 'id',
        }, */
      },
      type: {
        type: Sequelize.STRING
      },
      percent: {
        type: Sequelize.DECIMAL(4,2)
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
      'ContractsCtrs', ['contractId', 'contractorId', 'type'], {unique: true},
    );

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ContractsCtrs');
  }
};
