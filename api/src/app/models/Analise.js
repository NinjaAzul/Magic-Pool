//import modulos
import Sequelize, { Model } from 'sequelize';
//import modelos


class Analise extends Model {
  static init(sequelize) {
    super.init(
      {
        analise: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'analises',
      });


    return this;
  }
}

export default Analise;
