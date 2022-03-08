module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Pll',
    {
      pllNumber: {
        type: DataTypes.STRING,
      },
      pllName: {
        type: DataTypes.STRING,
      },

      pllQty: {
        type: DataTypes.INTEGER,
      },
      pllGun: {
        type: DataTypes.STRING,
      },
      pllNote: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'plls',
    }
  );

  return model;
};
