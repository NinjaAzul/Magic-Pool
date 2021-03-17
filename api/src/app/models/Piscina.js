//import modulos
import Sequelize, { Model } from 'sequelize';
//import modelos


class Piscina extends Model {
  static init(sequelize) {
    super.init(
      {
        piscina: Sequelize.STRING,
        status_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'piscinas',
      });


    return this;
  }
}

export default Piscina;
