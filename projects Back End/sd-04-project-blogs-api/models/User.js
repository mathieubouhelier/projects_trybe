const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Posts, { foreignKey: 'id', as: 'user' });
  };
  return User;
};

module.exports = createUser;
