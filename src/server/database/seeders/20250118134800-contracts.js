'use strict';


const Contracts = [
  {
    id: 1,
    sku: 'sku_1',
    contractorId: 1,
    trackId: 1,
    LicensorId: 1,
    date: new Date(),
    tax: 6,
    isrc: 'isrc',
    upc: 'upc',
    link: 'http://localhost.local',
    file: 'filename',
    moderated: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    sku: 'sku_2',
    contractorId: 2,
    trackId: 2,
    LicensorId: 2,
    date: new Date(),
    tax: 6,
    isrc: 'isrc',
    upc: 'upc',
    link: 'http://localhost.local',
    file: 'filename',
    moderated: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    sku: 'sku_3',
    contractorId: 3,
    trackId: 3,
    LicensorId: 3,
    date: new Date(),
    tax: 6,
    isrc: 'isrc',
    upc: 'upc',
    link: 'http://localhost.local',
    file: 'filename',
    moderated: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

];


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Contracts', Contracts, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contracts', Contracts, {});
  },
};
