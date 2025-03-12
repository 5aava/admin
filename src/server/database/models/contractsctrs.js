'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractsCtrs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContractsCtrs.init({
    contractId: DataTypes.INTEGER,
    contractorId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    percent: DataTypes.DECIMAL(5,2)
  }, {
    sequelize,
    modelName: 'ContractsCtrs',
  });
  return ContractsCtrs;
};
