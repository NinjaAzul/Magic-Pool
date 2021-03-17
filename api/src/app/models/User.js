import { uuid } from 'uuidv4';
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        email: Sequelize.STRING,
        perfis_id: {type:Sequelize.INTEGER,field:'perfis_id'},
        login: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        status_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName:'users',
      });

    this.addHook('beforeSave', async (user) => {
      return user.id = uuid();
    });

    this.addHook('beforeSave', async (user) => {
      if(user.password){
        return user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
//valida senha methods
  checkPassword(password){
    return bcrypt.compare(password, this.password_hash);
  }
  static associate(models) {
    this.belongsTo(models.Perfil, { foreignKey:'perfis_id',as: 'perfil' });
    this.belongsTo(models.Status, { foreignKey:'status_id',as: 'status' });

  }
}

export default User;
