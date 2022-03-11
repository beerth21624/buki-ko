module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Doc',
    {
      docName: {
        type: DataTypes.STRING,
      },
      docFile: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'documents',
    }
  );

  return model;
};
