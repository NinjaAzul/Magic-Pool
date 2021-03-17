//import modulos
import { Router } from 'express';

//import Controllers
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController';
import PerfilController from './app/controllers/PerfilController';
import StatusController from './app/controllers/StatusController';
import TipoController from './app/controllers/TipoController';
import PiscinaController from './app/controllers/PiscinaController';
import Tipo_ItemController from './app/controllers/Tipo_ItemController';
import FormularioController from './app/controllers/FormularioController';
import AnaliseController from './app/controllers/AnaliseController';
import ValPadraoController from './app/controllers/ValPadraoController';
//import Middlewares
import authMiddlewares from './app/middlewares/auth';
import validaTemp from './app/middlewares/validaTemp';


const routes = new Router();

//Cria sessions
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

//users
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.get('/users', UserController.index);
routes.delete('/users', UserController.delete);

//perfil
routes.post('/perfis', PerfilController.store);
routes.get('/perfis', PerfilController.index);
routes.put('/perfis/:id', PerfilController.update);
routes.delete('/perfis/:id', PerfilController.delete);
//tipo
routes.post('/tipos', TipoController.store);
routes.put('/tipos/:id', TipoController.update);
routes.delete('/tipos/:id', TipoController.delete);
routes.get('/tipos', TipoController.index);
//status
routes.post('/status', StatusController.store);
routes.put('/status/:id', StatusController.update);
routes.get('/status', StatusController.index);
routes.delete('/status/:id', StatusController.delete);
//piscinas
routes.post('/piscinas', PiscinaController.store);
routes.put('/piscinas', PiscinaController.update);
routes.get('/piscinas', PiscinaController.index);
routes.delete('/piscinas', PiscinaController.delete);
//Tipo_Item
routes.post('/tipo_itens', Tipo_ItemController.store);
routes.put('/tipo_itens/:id', Tipo_ItemController.update);
routes.get('/tipo_itens', Tipo_ItemController.index);
routes.delete('/tipo_itens/:id', Tipo_ItemController.delete);
//FormularioOperacional

routes.put('/formularios', FormularioController.update);
routes.get('/formularios', FormularioController.index);
routes.delete('/formularios/:id', FormularioController.delete);
//Analise
routes.post('/analises', AnaliseController.store);
routes.put('/analises/:id', AnaliseController.update);
routes.get('/analises', AnaliseController.index);
routes.delete('/analises/:id', AnaliseController.delete);


//ValPadra
routes.put('/valpadrao', ValPadraoController.update);
routes.get('/valpadrao', ValPadraoController.index);

//MidlewareValidaTemp
routes.use(validaTemp);

routes.post('/formularios', FormularioController.store);


export default routes;
