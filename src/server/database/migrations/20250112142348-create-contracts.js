'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {
        type: Sequelize.STRING
      },
      contractorId: {
        type: Sequelize.INTEGER,
        onDelete: 'RESTRICT',
        references: {
          model: 'Contractors',
          key: 'id',
        },
      },
      trackId: {
        type: Sequelize.INTEGER,
        onDelete: 'RESTRICT',
        references: {
          model: 'Tracks',
          key: 'id',
        },
      },
      LicensorId: {
        type: Sequelize.INTEGER,
        onDelete: 'RESTRICT',
        references: {
          model: 'Licensors',
          key: 'id',
        },
      },
      date: {
        type: Sequelize.DATE
      },
      tax: {
        type: Sequelize.INTEGER
      },
      iscr: {
        type: Sequelize.INTEGER
      },
      upc: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      file: {
        type: Sequelize.STRING
      },
      moderated: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Contracts');
  }
};
