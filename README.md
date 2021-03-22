# Magic-Pool


 # ✅ Pool-Control 🏊‍♀🏊🏊‍♂
 
   🚀 Sistema para controlar a qualidade de água de um parque aquático 🚀

# ✅ Status do Projeto


 🚀 Versão 1.0 já em funcionamento!!!  🚀



#  ✅ Features

# Usabilidade/Design Telas

- [x] Login
- [x] Home - Bem Vindo
- [x] Cadastro Temperatura(Ambiente - Rio)
- [x] Cadastro Piscinas
- [x] Lista de Piscinas Cadastradas
- [x] Cadastro de relátorio Analise PQA
- [x] Cadastro de relátorio Analise CACP
- [x] Relátorio Analise CACP
- [x] Relátorio Analise PQA
- [x] Cadastro de Usuarios
- [x] Lista de Usuarios


# Fetures Pendentes - Regras!


- [x]  Submits são tampados com o teclado android
- [x] AJUSTAR A IMAGEM DE CARREGAMENTO EM TODAS TELAS(o componente de carregamento de botoes enquanto carrega as informações).
- [x] Listar apenas piscinas ativas
- [x] Users desativados não podem logar no sistema!
- [x] loading tubarão ao entrar nas telas para ajudar no carregamento dos efects
- [x] ajuste timer token quando espira, tentar encaminhar uma mensagem 'efetue um novo login' ou redirecionar para o login
- [x] ajustar imputs REF e alterar inputs modo para number
- [x] Ajustar o NAVIGATION FOCUS EM TODAS TELAS!
- [x] Checar a orderBy de todos relaórios

# ✅ App on Figma

<a href="igma.com/file/oJNAybsPgrCFaAOxtkvhrX?embed_host=share&kind=&node-id=0%3A1&viewer=1">🧱 Figma 🧱</a>https://www.f

# ✅ Demonstração da aplicação

<h1 align="center">
  <img src=mobile/public/GitinputPadding.gif />
</h1>
<h1 align="center">
 <a href="https://www.linkedin.com/posts/erick-freitas-048064134_reactnative-activity-6769379522686070784-nbsA">🏊‍Sistem Demo Click Here!!!🏊‍</a>
</h1>


#  ✅ Configuração inicial do Sistema

#### Clonando o projeto
```sh
$ git clone https://github.com/NinjaAzul/Magic-Pool.git
$ cd Magic-Pool-master
```
#### Criando uma Imagem postgres com docker
```sh
1° Baixe o docker em sua maquina !
2° $ docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
3° $ docker start my_container
```
#### Iniciando a API
```sh
$ cd Api

# Rodando as migrations para o banco de dados e iniciando o projeto
 1° - $ yarn - "Dependencias do projeto"
 2° - $ yarn sequelize-cli db:migrate ou npx sequelize-cli db:migrate - "Cria uma migration no Postgres e cria as tabelas no banco"
 3° - $ yarn dev - "Inicia o BackEnd"
 4° $ yarn dev:debug - "Debuga o BackEnd"
```
#### Ajustando Variaveis Ambiente
```sh
$ .env

APP_URL =
NODE_ENV=development


# Auth
APP_SECRET= SECREDO AQUI  

# Postgres

DB_HOST=localhost
DB_USER=postgres
DB_PASS=docker
DB_NAME=
```

#### Default Config Data Base
```sh
 Default config DB
 
 //INSERIR STATUS ATIVO/INATIVO

INSERT INTO status VALUES (1, 'ATIVO', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

INSERT INTO status VALUES (2, 'INATIVO', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

----------------------------------------------------------------------------------------------------------------

//INSERIR PERFIS

INSERT INTO perfis VALUES (1, 'Operacional', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

INSERT INTO perfis VALUES (2, 'Gerencial', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

INSERT INTO perfis VALUES (3, 'TI', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

--------------------------------------------------------------------------------------------------------------------

//INSERIR TIPOS

INSERT INTO tipos VALUES (1, 'Formulário Operacional', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

--------------------------------------------------------------------------------------------------------------------

//INSERIR TIPO ITENS

INSERT INTO tipo_itens VALUES (1, 'CACP', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1, 1)

INSERT INTO tipo_itens VALUES (2, 'PQA', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1, 1)

-------------------------------------------------------------------------------------------------------------------

//INSERIR ANALISES

INSERT INTO analises VALUES (1, 1, '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00')

INSERT INTO analises VALUES (2, 2, '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00')

INSERT INTO analises VALUES (3, 3, '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00')

INSERT INTO analises VALUES (4, 4, '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00')

----------------------------------------------------------------------------------------------------------------
 
```
#### Obeservação
```sh
$ cd api/src/routes

Para cadastrar o primeiro Usúario recomendo comentar a linha: routes.use(authMiddlewares);

Para o cadastro do primeiro usúario no Insominia: 

https://insomnia.rest/

```

#### Iniciando o Frontend
```sh
cd mobile

 1° - $ yarn - "Dependencias do projeto"
 2° - $ yarn andoid ou npx react-native run-android "Inicia o projeto no emulador" OBS:"Emulador deve estar Ligado"
 3° Se divirta ! :)
```

# ⚠ PENDENCIAS
 
  - [x] NOVAS IDEIAS AQUI!

# ✅ Tecnologias utilizadas

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Docker](https://www.docker.com/get-started)
- [Postgres](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Javascript](https://www.javascript.com/)
- [Sequelize](https://sequelize.org/)

### :memo: Licença

Este projeto é desenvolvido sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para saber mais detalhes.

<p align="center" style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">Feito com 💙 by <strong>  😎 Erick de Freitas Gonçalves 😎 </strong> </p>

<Div style{alingnItems: 'center'}> 
 <img src=https://img.shields.io/badge/Licence-Private-blue/> 
  <img src=https://img.shields.io/badge/App-version%201.0-blue/> 
   <img src=https://img.shields.io/badge/Plataform-Android-green/> 
</Div>


 

