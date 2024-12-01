'use strict';


const Users = [
  {
    id: 1,
    name: 'admin',
    email: 'admin@rcsg.com',
    password: '$2a$10$kQOVbm3hwlhPznSw0bl84Oq0.i6Lwk50imjnFGghg1dOzHA50IWli', // admin@rcsg.com
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'moderator',
    email: 'moderator@rcsg.com',
    password: '$2a$10$inaTgrMh9QivKwIlKY3/wucEHG.B3pJbHbOE89r.Kcit.cW9eIHMq', // moderator@rcsg.com
    role: 'moderator',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'manager',
    email: 'manager@rcsg.com',
    password: '$2a$10$nVwncmEgVFiTloDoDY2EEeteA8fXke6DQGxHWPorrk75BnALU8DxO', // manager@rcsg.com
    role: 'manager',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'finance',
    email: 'finance@rcsg.com',
    password: '$2a$10$vBY.Sv7Izknms3fMbXlIBOvuDKpLU/bWWJVwD8uqLgPfkMdzZTcIC', // finance@rcsg.com
    role: 'finance',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

];


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', Users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', Users, {});
  },
};
