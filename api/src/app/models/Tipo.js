//import modulos
import Sequelize, { Model } from 'sequelize';
//import modelos


class Tipo extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: Sequelize.STRING,
        status_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'tipos',
      });


    return this;
  }
}

export default Tipo;
