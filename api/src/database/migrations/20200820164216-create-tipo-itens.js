'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tipo_itens', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

      },
      tipo_item: {
        type: Sequelize.STRING,
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
      tipo_id:{
        type: Sequelize.INTEGER,
        references:{
          model:'tipos',
          key:'id',
        },
        onUPDATE:'CASCADE',
        onDELETE:'SET NULL',
        allowNull:false,
      },

  });
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.dropTable('tipo_itens');
  }
};
