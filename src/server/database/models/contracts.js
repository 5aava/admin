'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contracts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contracts.init({
    sku: DataTypes.STRING,
    contractorId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER,
    licensorId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    tax: DataTypes.INTEGER,
    isrc: DataTypes.STRING,
    upc: DataTypes.STRING,
    link: DataTypes.STRING,
    file: DataTypes.STRING,
    moderated: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contracts',
  });
  return Contracts;
};
