'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('formularios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

      },
      formulario: {
        type: Sequelize.STRING,
      },

      cloro: {
        type: Sequelize.DOUBLE,

      },
      ph: {
        type: Sequelize.DOUBLE,

      },

      qualidade_agua: {
        type: Sequelize.DOUBLE,

      },

      temperatura: {
        type: Sequelize.DOUBLE,

      },

      hidrogeron: {
        type: Sequelize.DOUBLE,

      },

      temperatura_ambiente: {
        type: Sequelize.DOUBLE,

      },
      temperatura_rio: {
        type: Sequelize.DOUBLE,

      },

      borda: {
        type: Sequelize.INTEGER,

      },
      agua: {
        type: Sequelize.INTEGER,

      },
      odor: {
        type: Sequelize.INTEGER,

      },
      residuos: {
        type: Sequelize.INTEGER,

      },
      nivel: {
        type: Sequelize.INTEGER,

      },
      volume_gasto: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },


      tipo_item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tipo_itens',
          key: 'id',
        },
        onUPDATE: 'CASCADE',
        onDELETE: 'SET NULL',
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
        },
        onUPDATE: 'CASCADE',
        onDELETE: 'SET NULL',
      },

      piscina_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'piscinas',
          key: 'id',
        },
        onUPDATE: 'CASCADE',
        onDELETE: 'SET NULL',
      },

      analise_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'analises',
          key: 'id',
        },
        onUPDATE: 'CASCADE',
        onDELETE: 'SET NULL',
      },

    });
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.dropTable('formularios');
  }
};
