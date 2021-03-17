module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING (14),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password_hash: {
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

     perfis_id:{
      type: Sequelize.INTEGER,
      references:{
        model:'perfis',
        key:'id',
      },
      onUPDATE:'CASCADE',
      onDELETE:'SET NULL',
      allowNull:false,
    },




  });
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.dropTable('users');

  }
};
