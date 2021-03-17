//import modulos
import * as Yup from 'yup'; //model for validation
//import model
import ValPadrao from '../models/ValPadrao';
import { Op } from 'sequelize';

class ValPadraoController {

//Cria um ValPadrao
  async store(req, res) {

  }
  //Atualiza um ValPadrao
  async update(req, res) {

    const {
      id,
      valPadraoTempM,
      valPadraoTempA,
    } = req.body;

    const valpadrao = await ValPadrao.findByPk(id);

 await valpadrao.update({
  valPadraoTempM,
  valPadraoTempA,
 });

 return res.json(valpadrao);


  }
//lista ValPadrao
  async index(req, res) {

    const id = 1;

    const ValPadraoAtual = await ValPadrao.findByPk(id);

    //console.log(ValPadraoAtual);
    return res.json(ValPadraoAtual);

  }
  //Delete um valPadrao
  async delete(req, res) {
  }
}

export default new ValPadraoController();
