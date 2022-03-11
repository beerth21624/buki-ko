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
      role: {
        type: DataTypes.STRING,
        defaultValue: 'ผู้ใช้',
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
