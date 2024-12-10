'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contractors = sequelize.define('Contractors', {
    nickname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    patronymic: DataTypes.STRING

  }, {
    indexes: [
      { unique: true, fields: ['nickname'] },
    ],
  });

  Contractors.associate = models => {
    Contractors.hasMany(models.Tracks, {onDelete: 'CASCADE'});
  };

  return Contractors;
};

