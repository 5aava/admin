'use strict';


const Tracks = [
  {
    id: 1,
    name: 'track1',
    contractorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'track2',
    contractorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'track3',
    contractorId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

];


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tracks', Tracks, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tracks', Tracks, {});
  },
};
