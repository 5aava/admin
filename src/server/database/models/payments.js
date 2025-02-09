'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payments.init({
    contractorId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    q1: DataTypes.INTEGER,
    q1p: DataTypes.TINYINT,
    q2: DataTypes.INTEGER,
    q2p: DataTypes.TINYINT,
    q3: DataTypes.INTEGER,
    q3p: DataTypes.TINYINT,
    q4: DataTypes.INTEGER,
    q4p: DataTypes.TINYINT,
    total: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};