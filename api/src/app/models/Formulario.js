//import modulos
import Sequelize, { Model } from 'sequelize';
//import modelos


class Formulario extends Model {
  static init(sequelize) {
    super.init(
      {
        formulario: Sequelize.STRING,
        cloro: Sequelize.NUMBER,
        ph: Sequelize.NUMBER,
        qualidade_agua: Sequelize.NUMBER,
        temperatura: Sequelize.NUMBER,
        hidrogeron: Sequelize.NUMBER,
        temperatura_ambiente: Sequelize.INTEGER,
        temperatura_rio: Sequelize.INTEGER,
        borda: Sequelize.INTEGER,
        agua: Sequelize.INTEGER,
        odor: Sequelize.INTEGER,
        residuos: Sequelize.INTEGER,
        nivel: Sequelize.INTEGER,
        volume_gasto: Sequelize.INTEGER,
       //FK
        status_id: Sequelize.INTEGER,
        tipo_item_id: Sequelize.INTEGER,
        user_id: Sequelize.STRING,
        piscina_id: Sequelize.INTEGER,
        analise_id: Sequelize.INTEGER,


      },
      {
        sequelize,
        tableName: 'formularios',
      });


    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    this.belongsTo(models.Piscina, { foreignKey: 'piscina_id', as: 'piscinas' });
    this.belongsTo(models.Tipo_Item, { foreignKey: 'tipo_item_id', as: 'tipo_item' });
    this.belongsTo(models.Status, { foreignKey: 'status_id', as: 'status' });
    this.belongsTo(models.Analise, { foreignKey: 'analise_id', as: 'analises' });
  }
}
export default Formulario;

