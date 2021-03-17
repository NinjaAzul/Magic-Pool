'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('piscinas','status_id',{
      type: Sequelize.INTEGER,
      references: {model: 'status', key:'id'},
      onUpdate:'CASCADE',
      onDelete:'SET NULL',
      allowNull: true,
      defaultValue: 1,
    })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('piscinas','status_id');

  }
};
