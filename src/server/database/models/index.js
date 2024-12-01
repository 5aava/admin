const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.server.js')[process.env.ENV];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig,
);

const Users = require('./users');

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users(sequelize, Sequelize);

module.exports = db;
