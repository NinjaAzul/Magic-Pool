//import modulos
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
//import models
import User from '../models/User';
//import config
import authConfig from '../../config/auth';
//perfil
import Perfil from '../models/Perfil';


class SessionController {
  async store(req, res) {

    //validação dos dados de entrada with Yup
    const schema = Yup.object().shape({

      login: Yup.string().required(),
      password: Yup.string().required(),

    });
    // ! = false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }


    const { login, password } = req.body;

    const user = await User.findOne({

      where: { login }
    });
    //se user for diferente erro
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if(user.status_id === 2){
      return res.status(401).json({ error: 'Usuário Desativado' });
    }

    //! negação
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha não corresponde' })
    }
    const { id, nome, cpf, email, perfis_id } = user;

     const perfil = await Perfil.findByPk(perfis_id);
    const perfilUser = perfil.perfil;

    return res.json({
      user: {
        nome,
        cpf,
        email,
        perfilUser,
      },
      token: jwt.sign({ id }, authConfig.secret),
    });

  }
}

export default new SessionController();
