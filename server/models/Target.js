module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Target',
    {
      targetName: {
        type: DataTypes.STRING,
      },

      targetBill: {
        type: DataTypes.STRING,
      },
      targetQty: {
        type: DataTypes.STRING,
      },
      targetNote: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'targets',
    }
  );

  return model;
};
