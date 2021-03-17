//import modulos
import * as Yup from 'yup'; //model for validation
//import model
import Tipo from '../models/Tipo';
import Status from '../models/Status';


class TipoController {


  async store(req, res) {
    //validação dos dados de entrada with Yup
    const schema = Yup.object().shape({

      tipo: Yup.string().required(),

    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    const tipoExist = await Tipo.findOne({ where: { tipo: req.body.tipo } });

    if (tipoExist) {
      return res.status(400).json({ error: 'tipo já existe.' });
    }

    //statusBanco = await
    //Cria um tipo
    const { id, tipo,  } = await Tipo.create(req.body);

    return res.json({
      id,
      tipo,
    });
  }
  //atualiza um tipo
  async update(req, res) {

    const schema = Yup.object().shape({
      tipo: Yup.string(),
    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    const tipoUnico = req.body.tipo;

    const tipoBanco = await Tipo.findByPk(req.params.id);

    if (tipoUnico === tipoBanco.tipo) {

      return res.status(400).json({ error: 'tipo já existe.' });
    }
    const tipoExist = await Tipo.findOne({ where: { tipo: req.body.tipo } });

    if (tipoExist) {

      return res.status(400).json({ error: 'tipo já existe.' });
    }


    await tipoBanco.update(req.body);

    const tipoAtualizado = await Tipo.findByPk(req.params.id);

    return res.json(tipoAtualizado);
  }
  //list tipo controler
  async index(req, res) {


    const tipoListALL = await Tipo.findAll();


    return res.json(tipoListALL);
  }

  //delete um tipo
  async delete(req, res) {

    const tipoDelete = await Tipo.findByPk(req.params.id);

    tipoDelete.status_id = 2;

    await tipoDelete.save();

    return res.json(tipoDelete);


  }
}


export default new TipoController();
