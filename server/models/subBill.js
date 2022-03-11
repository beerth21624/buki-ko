module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'SubBill',
    {
      billName: {
        type: DataTypes.STRING,
      },
      recipName: {
        type: DataTypes.STRING,
      },

      payerName: {
        type: DataTypes.STRING,
      },
      agencyName: {
        type: DataTypes.STRING,
      },
      billQty: {
        type: DataTypes.INTEGER,
      },
      billType: {
        type: DataTypes.STRING,
      },
      listName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'subbills',
    }
  );

  return model;
};
