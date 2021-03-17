//import modulos
import Sequelize, { Model } from 'sequelize';
//import modelos


class Perfil extends Model {
  static init(sequelize) {
    super.init(
      {
        perfil: Sequelize.STRING,
        status_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'perfis',
      });


    return this;
  }
}

export default Perfil;
