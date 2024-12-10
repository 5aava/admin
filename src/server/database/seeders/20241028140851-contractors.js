'use strict';


const Contractors = [
  {
    id: 1,
    nickname: 'petya',
    firstname: 'Петя',
    lastname: 'Пупкин',
    patronymic: 'Пупкович',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    nickname: 'kosta',
    firstname: 'Костя',
    lastname: 'Дудкин',
    patronymic: 'Дудкович',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    nickname: 'roma',
    firstname: 'Роман',
    lastname: 'Рогаткин',
    patronymic: 'Вольфрамович',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

];


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Contractors', Contractors, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contractors', Contractors, {});
  },
};
