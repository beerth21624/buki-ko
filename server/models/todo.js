module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Todo',
    {
      todoTitle: {
        type: DataTypes.STRING,
      },
      todoDesc: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'todos',
    }
  );

  return model;
};
