module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Bill',
    {
      billNumber: {
        type: DataTypes.STRING,
      },
      agencyName: {
        type: DataTypes.STRING,
      },
      nameRecipient: {
        type: DataTypes.STRING,
      },
      nameApprover: {
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
  model.associate = (models) => {
    model.hasMany(models.Weapon, {
      foreignKey: 'BillId',
      constraints: false,
      as: 'Bills',
    });
  };

  return model;
};
