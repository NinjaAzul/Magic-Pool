//import modulos
import * as Yup from 'yup'; //model for validation
import { format, setHours, setMinutes, setSeconds } from 'date-fns';
//import model
import Formulario from '../models/Formulario';
import ValPadrao from '../models/ValPadrao';
import Analise from '../models/Analise';
import { Op } from 'sequelize';
import User from '../models/User';
import Piscina from '../models/Piscina';

class FormularioController {
  async store(req, res) {
    const id = 1;

    const { valPadraoTempM, valPadraoTempA } = await ValPadrao.findByPk(id);

    //console.log(ValPadraoAtual);

    const {
      agua,
      cloro,
      PH,
      qualidade_agua,
      temperatura,
      hidrogeron,
      borda,
      odor,
      residuos,
      nivel,
      volume_gasto,
      piscina_id,
      analise_id,
      tipo_item_id,
    } = req.body;
    //Regra cadastro 1 vez no dia.
    const data = new Date();

    let dataInicial = new Date(data.setHours(0, 0, 0, 0));

    let dataFinal = new Date(data.setHours(23, 59, 59, 997));

    dataInicial = dataInicial.toISOString().slice(0, 23).replace('T', ' ');

    dataFinal = dataFinal.toISOString().slice(0, 23).replace('T', ' ');


    if (tipo_item_id === 1) {
    const validaFormularioCACP = await Formulario.findOne({
      where: {
        tipo_item_id:1,
        analise_id,
        piscina_id,
        created_at: {
          [Op.gte]: dataInicial,
          [Op.lte]: dataFinal,
        },
      },
    });


      if (validaFormularioCACP) {
        return res.json({ error: 'A analise já foi cadastrada hoje' });
      }
    }


    if (tipo_item_id === 2) {
    const validaFormularioPQA = await Formulario.findOne({
      where: {
        tipo_item_id:2,
        piscina_id,
        created_at: {
          [Op.gte]: dataInicial,
          [Op.lte]: dataFinal,
        },
      },
    });


      if (validaFormularioPQA) {
        return res.json({ error: 'A analise já foi cadastrada hoje' });
      }
    }

    const formularioCadastrado = await Formulario.create({
      agua,
      cloro,
      ph: PH,
      qualidade_agua,
      temperatura,
      hidrogeron,
      temperatura_ambiente: valPadraoTempA,
      temperatura_rio: valPadraoTempM,
      borda,
      odor,
      residuos,
      nivel,
      volume_gasto,
      piscina_id,
      analise_id,
      tipo_item_id,
      user_id: req.userId,
    });

    return res.json({ formularioCadastrado });
  }
  //atualiza um Formulario
  async update(req, res) {
    const idTemp = 1;

    const { valPadraoTempM, valPadraoTempA } = await ValPadrao.findByPk(idTemp);

    const {
      id,
      agua,
      formulario,
      cloro,
      PH,
      qualidade_agua,
      temperatura,
      hidrogeron,
      temperatura_ambiente,
      temperatura_rio,
      borda,
      odor,
      residuos,
      nivel,
      volume_gasto,
      user_id,
      piscina_id,
      analise_id,
      tipo_item_id,
    } = req.body;

    const FormularioBanco = await Formulario.findByPk(id);

    //console.log(FormularioBanco);

    await FormularioBanco.update({
      agua,
      cloro,
      ph: PH,
      qualidade_agua,
      temperatura,
      hidrogeron,
      temperatura_ambiente: valPadraoTempA,
      temperatura_rio: valPadraoTempM,
      borda,
      odor,
      residuos,
      nivel,
      volume_gasto,
      piscina_id,
      analise_id,
      tipo_item_id,
      user_id: req.userId,
    });

    //console.log(FormularioBanco);

    return res.status(202).json({ msg: 'Atualizado com sucesso.' });
  }

  async index(req, res) {
    const { createdAt, filtroData, listaAnalises, tipo_item_id } = req.query;

    //console.log(filtroData);
    //console.log(createdAt);

    if (tipo_item_id === '2' && createdAt !== filtroData) {
      const dataStrintI = createdAt.toString();

      const dataStrintF = filtroData.toString();

      const dataInicial = dataStrintI.replace(
        /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
        '00:00:00'
      );

      const dataFinal = dataStrintF.replace(
        /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
        '23:59:59'
      );

      const dataInicialFormat = format(
        new Date(dataInicial),
        'yyyy/dd/MM  HH:mm:ss'
      );

      const dataFinalFormat = format(
        new Date(dataFinal),
        'yyyy/dd/MM  HH:mm:ss'
      );

      const formularios = await Formulario.findAll({
        attributes: [
          'id',
          'agua',
          'odor',
          'piscina_id',
          'analise_id',
          'user_id',
          'borda',
          'residuos',
          'nivel',
          'created_at',
          'tipo_item_id',
        ],
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['nome'],
          },
          {
            model: Piscina,
            as: 'piscinas',
            attributes: ['piscina'],
          },
        ],
        where: {
          tipo_item_id: 2,
          created_at: {
            [Op.gte]: dataInicialFormat,
            [Op.lte]: dataFinalFormat,
          },
        },
        order: ['created_at'],
      });

      //console.log(formularios) CACP;
      return res.json(formularios);
    } else if (tipo_item_id === '2' && createdAt === filtroData) {
      const dataStrintI = createdAt.toString();

      const dataStrintF = filtroData.toString();

      const dataInicial = dataStrintI.replace(
        /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
        '00:00:00'
      );

      const dataFinal = dataStrintF.replace(
        /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
        '23:59:59'
      );

      const dataInicialFormat = format(
        new Date(dataInicial),
        'yyyy/dd/MM  HH:mm:ss'
      );

      const dataFinalFormat = format(
        new Date(dataFinal),
        'yyyy/dd/MM  HH:mm:ss'
      );

      const formularios = await Formulario.findAll({
        attributes: [
          'id',
          'agua',
          'odor',
          'piscina_id',
          'analise_id',
          'user_id',
          'borda',
          'residuos',
          'nivel',
          'created_at',
          'tipo_item_id',
        ],
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['nome'],
          },
          {
            model: Piscina,
            as: 'piscinas',
            attributes: ['piscina'],
          },
        ],
        where: {
          tipo_item_id: 2,
          created_at: {
            [Op.gte]: dataInicialFormat,
            [Op.lte]: dataFinalFormat,
          },
        },
        order: ['created_at'],
      });
      //console.log(formularios);
      return res.json(formularios);
    }

    const analiseId = await Analise.findAll({
      where: { analise: listaAnalises },
    });

    const ArrayId = [];

    analiseId.map((analises) => {
      ArrayId.push(analises.id);
    });
    //console.log(ArrayId);

    // console.log(createdAt);
    //console.log(filtroData);
    //console.log(listaAnalises);

    //Primeiro IF CACP
    if (tipo_item_id === '1' && createdAt !== filtroData) {
      const dataStrintI = createdAt.toString();

      const dataStrintF = filtroData.toString();

      const dataInicial = dataStrintI.replace(
        /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
        '00:00:00'
      );

      const dataFinal = dataStrintF.replace(
        /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
        '23:59:59'
      );

      const dataInicialFormat = format(
        new Date(dataInicial),
        'yyyy/dd/MM  HH:mm:ss'
      );

      const dataFinalFormat = format(
        new Date(dataFinal),
        'yyyy/dd/MM  HH:mm:ss'
      );

      const formularios = await Formulario.findAll({
        attributes: [
          'id',
          'cloro',
          'ph',
          'piscina_id',
          'analise_id',
          'user_id',
          'qualidade_agua',
          'temperatura',
          'hidrogeron',
          'temperatura_ambiente',
          'temperatura_rio',
          'created_at',
          'tipo_item_id',
        ],
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['nome'],
          },
          {
            model: Piscina,
            as: 'piscinas',
            attributes: ['piscina'],
          },
          {
            model: Analise,
            as: 'analises',
            attributes: ['analise'],
          },
        ],
        where: {
          analise_id: ArrayId,
          created_at: {
            [Op.gte]: dataInicialFormat,
            [Op.lte]: dataFinalFormat,
          },
        },
        order: ['created_at'],
      });

      //console.log(formularios);

      return res.json(formularios);
    } else if (tipo_item_id === '1' && createdAt === filtroData) {
      const dataStrintI = createdAt.toString();

      const dataStrintF = filtroData.toString();

      const dataInicial = dataStrintI.replace(
        /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
        '00:00:00'
      );

      const dataFinal = dataStrintF.replace(
        /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/,
        '23:59:59'
      );

      const dataInicialFormat = format(
        new Date(dataInicial),
        'yyyy/dd/MM  HH:mm:ss'
      );

      const dataFinalFormat = format(
        new Date(dataFinal),
        'yyyy/dd/MM  HH:mm:ss'
      );

      const formularios = await Formulario.findAll({
        attributes: [
          'id',
          'cloro',
          'ph',
          'piscina_id',
          'analise_id',
          'user_id',
          'qualidade_agua',
          'temperatura',
          'hidrogeron',
          'temperatura_ambiente',
          'temperatura_rio',
          'created_at',
          'tipo_item_id',
        ],
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['nome'],
          },
          {
            model: Piscina,
            as: 'piscinas',
            attributes: ['piscina'],
          },
          {
            model: Analise,
            as: 'analises',
            attributes: ['analise'],
          },
        ],
        where: {
          analise_id: ArrayId,
          created_at: {
            [Op.gte]: dataInicialFormat,
            [Op.lte]: dataFinalFormat,
          },
        },
        order: ['created_at'],
      });
      //console.log(formularios);
      return res.json(formularios);
    }
  }

  //delete um Formulario
  async delete(req, res) {
    const FormularioDelete = await Formulario.findByPk(req.params.id);

    FormularioDelete.status_id = 2;

    await FormularioDelete.save();

    return res.json(FormularioDelete);
  }
}

export default new FormularioController();
