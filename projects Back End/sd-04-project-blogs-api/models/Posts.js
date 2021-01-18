const createPost = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    { createdAt: 'published', updatedAt: 'updated' },
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Posts;
};

module.exports = createPost;
