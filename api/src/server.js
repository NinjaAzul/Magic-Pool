import'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import './database';

const app = express()

app.use(cors());

app.use(express.json());

app.use(routes);

let port = 4001;

app.listen(port, function () {
  console.log("Servidor rodando!!! 🚀" , port);
});

