module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
      },
      rank: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      validated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'users',
    }
  );

  return model;
};
