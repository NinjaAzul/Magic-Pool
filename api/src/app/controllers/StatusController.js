//import modulos
import * as Yup from 'yup'; //model for validation
import { Op } from 'sequelize';
//import models
import Status from '../models/Status';





class StatusController {
  //create status
  async store(req, res) {
    //validação dos dados de entrada with Yup
    const schema = Yup.object().shape({

      status: Yup.string().required(),

    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    //valida se já existe um status
    const StatusExist = await Status.findOne({ where: { status: req.body.status } });

    if (StatusExist) {
      return res.status(400).json({ error: 'Status já existe.' });
    }

    //create status
    const { id, status, } = await Status.create(req.body);

    return res.json({
      id,
      status,
    });
  }

  //update status
  async update(req, res) {

    const schema = Yup.object().shape({
      status: Yup.string().required(),
    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }
    //update regra
    const StatusUnico = req.body.status;

    const StatusBanco = await Status.findByPk(req.params.id);
    //Valida Status unico
    if (StatusUnico === StatusBanco.status) {

      return res.status(400).json({ error: 'Status já existe.' });
    }
    //const StatusExist = await Status.findOne({ where: {status: {
      //[Op.iLike]: `%${req.body.status}%`,
   // }}});
   const StatusExist = await Status.findOne({ where: {status: req.body.status}});


    if (StatusExist) {

      return res.status(400).json({ error: 'Status já existe.' });
    }

    const { id, status } = await StatusBanco.update(req.body);



    return res.json({
      id,
      status,
    });


  }

  async index(req, res) {


    const statusListALL = await Status.findAll();


    return res.json(statusListALL);
  }

  //delete um Status
  async delete(req, res) {

    const statusDelete = await Status.findByPk(req.params.id);

    statusDelete.status_id = 2;

    await statusDelete.save();

    return res.json(statusDelete);
  }
}




export default new StatusController();
