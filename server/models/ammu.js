module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Ammu',
    {
      ammuLot: {
        type: DataTypes.STRING,
      },
      ammuName: {
        type: DataTypes.STRING,
      },
      ammuBill: {
        type: DataTypes.STRING,
      },
      ammuQty: {
        type: DataTypes.INTEGER,
      },
      ammuNote: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'ammus',
    }
  );
  return model;
};
