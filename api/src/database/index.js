//import modulos
import Sequelize from 'sequelize';
//import databaseConfig
import databaseConfig from '../config/database';
//import models for database
import User from '../app/models/User';
import Perfil from '../app/models/Perfil';
import Status from '../app/models/Status';
import Tipos from '../app/models/Tipo';
import Piscina from '../app/models/Piscina';
import Tipo_Item from "../app/models/Tipo_Item";
import Formulario from "../app/models/Formulario";
import Analise from '../app/models/Analise';
import ValPadrao from '../app/models/ValPadrao';


const models = [User,Perfil,Status,Tipos,Piscina,Tipo_Item,Formulario,Analise,ValPadrao];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));

  }
}

export default new Database();
