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
    year: DataTypes.DECIMAL(4,0),
    q1: DataTypes.DECIMAL(15,2),
    q1p: DataTypes.TINYINT,
    q2: DataTypes.DECIMAL(15,2),
    q2p: DataTypes.TINYINT,
    q3: DataTypes.DECIMAL(15,2),
    q3p: DataTypes.TINYINT,
    q4: DataTypes.DECIMAL(15,2),
    q4p: DataTypes.TINYINT,
    total: DataTypes.DECIMAL(15,2),
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};
