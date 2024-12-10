'use strict';


const Licensors = [
  {
    id: 1,
    name: 'licensor1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'licensor2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'licensor3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

];


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Licensors', Licensors, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Licensors', Licensors, {});
  },
};
