module.exports = {
  up: async (queryInterface, Sequelize) => {
    const blogTable = queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: { allowNull: false, type: Sequelize.STRING },
      content: { allowNull: false, type: Sequelize.STRING },
      userId: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: { model: 'Users', key: 'id' },
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        field: 'published',
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        field: 'updated',
        type: Sequelize.DATE,
      },
    });

    return blogTable;
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable('Posts');
  },
};
