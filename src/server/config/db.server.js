require('dotenv').config({ path: `.env.local` });

module.exports = {

  development: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    dialectOptions: {
      useUTC: false,
      timezone: 'Etc/GMT+5',
    },
    pool: {
      max: 2025,
      min: 0,
      acquire: 300000,
      idle: 100000,
    },
    logging:  console.log, // console.log,
  },
  localhost: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    dialectOptions: {
      useUTC: false,
      timezone: 'Etc/GMT+5',
    },
    pool: {
      max: 2025,
      min: 0,
      acquire: 300000,
      idle: 100000,
    },
    logging:  console.log, // console.log,
  },
  production: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    dialectOptions: {
      useUTC: false,
      timezone: 'Etc/GMT+3',
    },
    logging: false,
  },
  test: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    dialectOptions: {
      useUTC: false,
      timezone: 'Etc/GMT+3',
    },
    logging: console.log,
  },
};

