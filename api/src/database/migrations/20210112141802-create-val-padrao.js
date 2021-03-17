'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('valpadrao', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

      },
      val_padrao_temp_m: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      val_padrao_temp_a: {
        type: Sequelize.DOUBLE,
        allowNull: false,
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

    return queryInterface.dropTable('valpadrao');
  }
};
