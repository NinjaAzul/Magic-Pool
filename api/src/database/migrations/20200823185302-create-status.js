module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('status', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    });
  },
      down: async (queryInterface, Sequelize) => {

        return queryInterface.dropTable('status');

      }
    }
