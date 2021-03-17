//import modulos
import Sequelize, { Model } from 'sequelize';
//import modelos


class Status extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
        status_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'status',
      });


    return this;
  }
}

export default Status;
