import ValPadrao from '../models/ValPadrao';
import { Op } from 'sequelize';

export default async (req, res, next) => {

  const data = new Date();

  let dataInicial = new Date( data.setHours(0, 0, 0, 0));

  let dataFinal =new Date(data.setHours(23, 59, 59, 997));

  dataInicial = dataInicial.toISOString().slice(0, 19).replace('T', ' ');

  dataFinal = dataFinal.toISOString().slice(0, 19).replace('T', ' ');

  //const validaValPadrao = await ValPadrao.sequelize.query("SELECT * from valpadrao where created_at between date_trunc('day', current_date at TIME ZONE 'America/Sao_Paulo') AND now() at TIME ZONE 'America/Sao_Paulo'")

  const validaValPadrao = await ValPadrao.findOne({
    where: {
      updated_at: {
        [Op.gte]: dataInicial,
        [Op.lte]: dataFinal,
      },
    },
  });


 if(!validaValPadrao){
  return res.json({ error : "Cadastre a temperatura de hoje - Rio e Ambiente",
  })
 }

  return next();

};
