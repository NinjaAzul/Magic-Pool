//import modulos
import * as Yup from 'yup'; //model for validation
//import model
import Tipo_Item from "../models/Tipo_Item";

class Tipo_ItemController {


  async store(req, res) {
    //validação dos dados de entrada with Yup
    const schema = Yup.object().shape({

      tipo_item: Yup.string().required(),
      tipo_id: Yup.number().required(),

    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    const tipo_itemExist = await Tipo_Item.findOne({ where: { tipo_item: req.body.tipo_item } });

    if (tipo_itemExist) {

      return res.status(400).json({ error: 'tipo do item já existe.' });
    }


    //Cria um Tipo_Item
    const { id, tipo_item, tipo_id } = await Tipo_Item.create(req.body);

    return res.json({
      id,
      tipo_item,
      tipo_id,
    });
  }
  //atualiza um Tipo_Item
  async update(req, res) {

    const schema = Yup.object().shape({
      tipo_item: Yup.string().required(),
      tipo_id: Yup.number(),

    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }
    //update regra
    const Tipo_ItemUnico = req.body.tipo_item;

    const tipo_itemBanco = await Tipo_Item.findByPk(req.params.id);
    //Valida Tipo_Item unico
    if (Tipo_ItemUnico === tipo_itemBanco.tipo_item) {

      return res.status(400).json({ error: 'Tipo do item já existe.' });
    }
    const tipo_itemExist = await Tipo_Item.findOne({ where: { tipo_item: req.body.tipo_item } });

    if (tipo_itemExist) {

      return res.status(400).json({ error: 'tipo do item já existe.' });
    }

    const { id, tipo_item, tipo_id } = await tipo_itemBanco.update(req.body);



    return res.json({
      id,
      tipo_item,
      tipo_id,
    });


  }

  async index(req, res) {


    const tipo_itemListALL = await Tipo_Item.findAll();


    return res.json(tipo_itemListALL);
  }

  //delete um Tipo_Item
  async delete(req, res) {

    const tipo_itemDelete = await Tipo_Item.findByPk(req.params.id);

    tipo_itemDelete.status_id = 2;

    await tipo_itemDelete.save();

    return res.json(tipo_itemDelete);


  }
}

export default new Tipo_ItemController();
