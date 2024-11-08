'use strict';


const Blockchains = [
  {
    id: 1,
    name: 'POLYGON',
    network_url: 'https://polygon-mumbai.infura.io/v3/',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'TON',
    network_url: 'https://',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'ETHEREUM',
    network_url: 'https://',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'TRON',
    network_url: 'https://',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

];


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Blockchains', Blockchains, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Blockchains', Blockchains, {});
  },
};
