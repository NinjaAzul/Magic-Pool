//import modulos
import Sequelize, { Model } from 'sequelize';
//import modelos


class Tipo_Item extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo_item: Sequelize.STRING,
        status_id: Sequelize.INTEGER,
        tipo_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'tipo_itens',
      });


    return this;
  }
  static associate(models) {
    this.belongsTo(models.Tipo, { foreignKey: 'tipo_id', as: 'tipo' });
    this.belongsTo(models.Status, { foreignKey: 'status_id', as: 'status' });
  }
}
export default Tipo_Item;
