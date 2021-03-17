//import modulos
import * as Yup from 'yup'; //model for validation
//import model
import Analise from '../models/Analise';

class AnaliseController {


  async store(req, res) {
    //validação dos dados de entrada with Yup
    const schema = Yup.object().shape({

      analise: Yup.number().required(),

    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    const analiseExist = await Analise.findOne({ where: { analise: req.body.analise } });

    if (analiseExist) {

      return res.status(400).json({ error: 'analise já existe.' });
    }


    //Cria um analise
    const { id, analise } = await Analise.create(req.body);

    return res.json({
      id,
      analise,
    });
  }
  //atualiza um analise
  async update(req, res) {

    const schema = Yup.object().shape({
      analise: Yup.string(),
    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }
    //update regra
    const analiseUnico = req.body.analise;

    const analiseBanco = await analise.findByPk(req.params.id);
    //Valida analise unico
    if (analiseUnico === analiseBanco.analise) {

      return res.status(400).json({ error: 'analise já existe.' });
    }
    const analiseExist = await analise.findOne({ where: { analise: req.body.analise } });

    if (analiseExist) {

      return res.status(400).json({ error: 'analise já existe.' });
    }

    const { id, analise } = await analiseBanco.update(req.body);



    return res.json({
      id,
      analise,
    });


  }

  async index(req, res) {



    const analiseListALL = await Analise.findAll({order:['id']});


    return res.json(analiseListALL);
  }

  //delete um analise
  async delete(req, res) {

    const analiseDelete = await Analise.findByPk(req.params.id);

    analiseDelete.status_id = 2;

    await analiseDelete.save();

    return res.json(analiseDelete);


  }
}

export default new AnaliseController();
