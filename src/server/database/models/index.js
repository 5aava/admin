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
const Incomes = require('./incomes');
const Payments = require('./payments');
const Royalties = require('./royalties');
const RoyaltiesCtrs = require('./royaltiesctrs');
const RoyaltiesTrks = require('./royaltiestrks');
const Reports = require('./reports');

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users(sequelize, Sequelize);
db.Contractors = Contractors(sequelize, Sequelize);
db.Licensors = Licensors(sequelize, Sequelize);
db.Tracks = Tracks(sequelize, Sequelize);
db.Contracts = Contracts(sequelize, Sequelize);
db.ContractsCtrs = ContractsCtrs(sequelize, Sequelize);
db.Incomes = Incomes(sequelize, Sequelize);
db.Payments = Payments(sequelize, Sequelize);
db.Royalties = Royalties(sequelize, Sequelize);
db.RoyaltiesCtrs = RoyaltiesCtrs(sequelize, Sequelize);
db.RoyaltiesTrks = RoyaltiesTrks(sequelize, Sequelize);
db.Reports = Reports(sequelize, Sequelize);

module.exports = db;
