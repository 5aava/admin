'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tracks = sequelize.define('Tracks', {
    name: DataTypes.STRING,
    contractorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Contractors',
        key: 'id',
      },
    }

  }, {});

  Tracks.associate = models => {
    Tracks.belongsTo(models.Contractors, {foreignKey: 'contractorId'});
  };

  return Tracks;
};

