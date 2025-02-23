'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incomes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Incomes.init({
    contractorId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER,
    year: DataTypes.DECIMAL(4,0),
    q1: DataTypes.DECIMAL(15,2),
    q2: DataTypes.DECIMAL(15,2),
    q3: DataTypes.DECIMAL(15,2),
    q4: DataTypes.DECIMAL(15,2),
    total: DataTypes.DECIMAL(15,2),
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Incomes',
  });
  return Incomes;
};
