//import modulos
import * as Yup from 'yup'; //model for validation
//import model
import Perfil from '../models/Perfil';

class PerfilController {


  async store(req, res) {
    //validação dos dados de entrada with Yup
    const schema = Yup.object().shape({

      perfil: Yup.string().required(),

    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }



    //Cria um perfil
    const { id, perfil } = await Perfil.create(req.body);

    return res.json({
      id,
      perfil,
    });
  }
  //atualiza um perfil
  async update(req, res) {

    const schema = Yup.object().shape({
      perfil: Yup.string(),
    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }
    //update regra
    const perfilUnico = req.body.perfil;

    const perfilBanco = await Perfil.findByPk(req.params.id);
    //Valida perfil unico
    if (perfilUnico === perfilBanco.perfil) {

      return res.status(400).json({ error: 'Perfil já existe.' });
    }
    const perfilExist = await Perfil.findOne({ where: { perfil: req.body.perfil } });

    if (perfilExist) {

      return res.status(400).json({ error: 'Perfil já existe.' });
    }

    const { id, perfil } = await perfilBanco.update(req.body);



    return res.json({
      id,
      perfil,
    });


  }

  async index(req, res) {


    const perfilListALL = await Perfil.findAll();


    return res.json(perfilListALL);
  }

  //delete um perfil
  async delete(req, res) {

    const perfilDelete = await Perfil.findByPk(req.params.id);

    perfilDelete.status_id = 2;

    await perfilDelete.save();

    return res.json(perfilDelete);


  }
}

export default new PerfilController();
