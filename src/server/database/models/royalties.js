'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Royalties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Royalties.init({
    contractorId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER,
    contractId: DataTypes.INTEGER,
    usnTax: DataTypes.TINYINT,
    totalValByYears: DataTypes.DECIMAL(15,2),
    valMinusUsn: DataTypes.DECIMAL(15,2),
    valForGaz: DataTypes.DECIMAL(15,2),
    valForContractors: DataTypes.DECIMAL(15,2)
  }, {
    sequelize,
    modelName: 'Royalties',
  });
  return Royalties;
};
