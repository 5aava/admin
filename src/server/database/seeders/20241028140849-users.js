'use strict';


const Users = [
  {
    id: 1,
    name: 'admin',
    email: 'admin@rcsg.com',
    password: '$2a$10$UmlXQbjH8m0xse5GsXQ8/uugSpS52ejwZ6x12dWTUKxKXeK59Q6Ku', // bcrypt password rounds 10
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'moderator',
    email: 'moderator@rcsg.com',
    password: '$2a$10$UmlXQbjH8m0xse5GsXQ8/uugSpS52ejwZ6x12dWTUKxKXeK59Q6Ku',
    role: 'moderator',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'manager',
    email: 'manager@rcsg.com',
    password: '$2a$10$UmlXQbjH8m0xse5GsXQ8/uugSpS52ejwZ6x12dWTUKxKXeK59Q6Ku',
    role: 'manager',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'finance',
    email: 'finance@rcsg.com',
    password: '$2a$10$UmlXQbjH8m0xse5GsXQ8/uugSpS52ejwZ6x12dWTUKxKXeK59Q6Ku',
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
