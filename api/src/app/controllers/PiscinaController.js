//import modulos
import * as Yup from 'yup'; //model for validation
//import model
import Piscina from '../models/Piscina';
import { Op } from 'sequelize';

class PiscinaController {


  async store(req, res) {
    //validação dos dados de entrada with Yup
    const schema = Yup.object().shape({

      piscina: Yup.string().required(),

    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    const piscinaExist = await Piscina.findOne({ where: { piscina: req.body.piscina } });

    if (piscinaExist) {

      return res.status(400).json({ error: 'piscina já existe.' });
    }


    //Cria um piscina
    const { id, piscina } = await Piscina.create(req.body);

    return res.json({
      id,
      piscina,
    });
  }
  //atualiza um piscina
  async update(req, res) {


    //update regra
    const { id, piscina } = req.body;

    //console.log(id);

    const piscinaBanco = await Piscina.findByPk(id);

    //console.log(piscinaBanco);
    //Valida piscina unico
    const piscinaExist = await Piscina.findOne({
      where:
        { piscina} });


    if (piscinaExist){
      return res.status(202).json({ error: 'Piscina já existe!!' });
    }





    await piscinaBanco.update({

      piscina,

    });


    return res.status(202).json({ msg: 'Atualizado com sucesso.' });


  }

  async index(req, res) {
    {
    const { piscina, tipo_item_id  } = req.query

 //console.log(tipo_item_id);

    if (piscina) {

      const piscinaListALL = await Piscina.findAll({
        where: {
          piscina: { [Op.iLike]: `%${piscina}%` }
        },
        order:
        ['id'],
      });
      return res.json(piscinaListALL);

    }

    if(tipo_item_id === '1'){

       const piscinaListALL = await Piscina.findAll({
      where: {
       status_id: 1,
      },
      order:
      ['id'],
    });
    return res.json(piscinaListALL);

  }

  //todos ativos e desativos

    if (tipo_item_id === '2') {

    const piscinaListALL = await Piscina.findAll({
        order:
        ['id'],
      });
      return res.json(piscinaListALL);
    }

  }
}
  //delete um piscina
  async delete(req, res) {

    const { piscinaId } = req.query;

    const piscinaDelete = await Piscina.findByPk(piscinaId);

    if (piscinaDelete.status_id === 1) {

      piscinaDelete.status_id = 2;

      await piscinaDelete.save();

      return res.status(200).json({ mss: 'Piscina desativada' });

    } else {
      piscinaDelete.status_id = 1;

      await piscinaDelete.save();

      return res.status(200).json({ mss: 'Piscina ativada' });

    }


  }
}

export default new PiscinaController();
