'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('formularios','status_id',{
      type: Sequelize.INTEGER,
      references: {model: 'status', key:'id'},
      onUpdate:'CASCADE',
      onDelete:'SET NULL',
      allowNull: true,
      defaultValue: 1,
    })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('formularios','status_id');

  }
};
