//import modulos
import * as Yup from 'yup'; //model for validation
//import models
import User from '../models/User';
import Perfil from '../models/Perfil';



class UserController {
  async store(req, res) {
    //validação dos dados de entrada with Yup



    const userExist = await User.findOne({ where: { cpf: req.body.cpf } });


    if (userExist) {
      return res.status(202).json({ error: 'Usuário já existe.' });
    }


    const {
      nome,
      cpf,
      email,
      login,
      password,
      perfis_id,
    } = req.body;

    //console.log(nome,cpf,email,login,password,perfis_id);

    //cria um usuario
    const novoUser = await User.create({
      nome,
      cpf,
      email,
      login,
      password,
      perfis_id
    });


    return res.json({ novoUser });
  }
  //atualiza usuario
  async update(req, res) {
    // Validation UPDATE USER

    const {
      id,
      email,
      password,
      comfirmPassword,
      perfil_id,
    } = req.body;

    const user = await User.findByPk(id);

    if (comfirmPassword !== password) {
      return res.status(202).json({ error: 'As senhas não correspondem' });
    }

    //diferente de user login


    await user.update({
      password,
      email,
      perfis_id: perfil_id,
    });



    return res.status(202).json({ msg: 'Atualizado com sucesso.' });
  }
  //list all user
  async index(req, res) {


    const { cpf } = req.query



    if (cpf) {


      const userListALL = await User.findAll({
        attributes: ['id',
          'nome',
          'cpf',
          'email',
          'perfis_id',
          'login',
          'password_hash',
          'status_id',
          'createdAt',
          'updatedAt'],
        include: [{
          model: Perfil,
          as: 'perfil',
          attributes: ['perfil'],
        }],
        where: {
          cpf
        }
      });

      //console.log(userListALL);
      return res.json(userListALL);
    } else {
      const userListALL = await User.findAll({
        attributes: ['id',
          'nome',
          'cpf',
          'email',
          'perfis_id',
          'login',
          'password_hash',
          'status_id',
          'createdAt',
          'updatedAt'],
        include: [{
          model: Perfil,
          as: 'perfil',
          attributes: ['perfil'],
        }],
      });


      //console.log(userListALL);
      return res.json(userListALL);
    }
  }

  //delete um user
  async delete(req, res) {



    const { userId } = req.query;

    const userDelete = await User.findByPk(userId);

    if (userDelete.status_id === 1) {

      userDelete.status_id = 2;

      await userDelete.save();

      return res.status(200).json({ mss: 'Usuário desativado' });

    } else {
      userDelete.status_id = 1;

      await userDelete.save();

      return res.status(200).json({ mss: 'Usuário ativado' });

    }


  }
}



export default new UserController();
