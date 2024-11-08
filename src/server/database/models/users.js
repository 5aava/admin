'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blockchains extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Blockchains.init({
    name: DataTypes.STRING,
    network_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Blockchains',
  });
  return Blockchains;
};
