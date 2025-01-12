const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.server.js')[process.env.ENV];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig,
);

const Users = require('./users');
const Contractors = require('./contractors');
const Licensors = require('./licensors');
const Tracks = require('./tracks');
const Contracts = require('./contracts');
const ContractsCtrs = require('./contractsctrs');

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users(sequelize, Sequelize);
db.Contractors = Contractors(sequelize, Sequelize);
db.Licensors = Licensors(sequelize, Sequelize);
db.Tracks = Tracks(sequelize, Sequelize);
db.Contracts = Contracts(sequelize, Sequelize);
db.ContractsCtrs = ContractsCtrs(sequelize, Sequelize);

module.exports = db;
