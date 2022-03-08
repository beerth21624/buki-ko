module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Bill',
    {
      billNumber: {
        type: DataTypes.STRING,
      },
      AgencyName: {
        type: DataTypes.STRING,
      },
      NameRecipient: {
        type: DataTypes.STRING,
      },
      NameApprover: {
        type: DataTypes.STRING,
      },
      listBillId: {
        type: DataTypes.STRING,
      },
      billNote: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'bills',
    }
  );

  return model;
};
