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
    year: DataTypes.INTEGER,
    q1: DataTypes.INTEGER,
    q2: DataTypes.INTEGER,
    q3: DataTypes.INTEGER,
    q4: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Incomes',
  });
  return Incomes;
};
