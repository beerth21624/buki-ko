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
    model.associate = (models) => {
      model.belongsTo(models.Bill, {
        foreignKey: 'BillId',
        constraints: false,
        as: 'Weapons',
      });
    };

  return model;
};
