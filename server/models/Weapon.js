module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Weapon',
    {
      gunNumber: {
        type: DataTypes.STRING,
      },
      gunName: {
        type: DataTypes.STRING,
      },
      gunStatus: {
        type: DataTypes.STRING,
      },
      gunStore: {
        type: DataTypes.STRING,
      },
      gunBill: {
        type: DataTypes.STRING,
      },
      gunNote: {
        type: DataTypes.STRING,
      },
      gunImage: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'weapons',
    }
  );

  return model;
};
