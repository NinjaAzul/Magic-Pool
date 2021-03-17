//import modulos
import Sequelize, { Model } from 'sequelize';
//import modelos


class valPadrao extends Model {
  static init(sequelize) {
    super.init(
      {
        valPadraoTempM: Sequelize.DOUBLE,
        valPadraoTempA: Sequelize.DOUBLE,

      },
      {
        sequelize,
        tableName: 'valpadrao',
      });


    return this;
  }
}

export default valPadrao;
