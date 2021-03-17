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

# ✅ Demonstração da aplicação

<h1 align="center">
  <img src=mobile/public/GitinputPadding.gif />
</h1>





#  ✅ Configuração inicial do Sistema - DB

#### Clonando o projeto
```sh
$ git clone https://github.com/NinjaAzul/NLW4.git
$ cd NLW4-master
```
#### Iniciando a API
```sh
$ cd Api

# Rodando as migrations para o banco de dados e iniciando o projeto
 1° - $ yarn - "Dependencias do projeto"
 2° - $ yarn typeorm migration:run - "cria uma migration no SQLITE e cria as tabelas no banco"
 3° - $ yarn dev - "inicia o backend" 
```
--------------------------------------------------------------------------------------------------------------------------------------------
//INSERIR USUÁRIO                                                                                                                            

INSERT INTO users VALUES ('97afd69d-ed80-44a3-b57c-0332261cd01d', 'Administrador', '12345678910', 'admin@admin.com', 'admin',                 '$2a$08$YlkcEcSiixBAM97ymyKMxeFjK9oLKtOPq43wPg7ag1ONKJdnwoRLm', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 3, 1)

--------------------------------------------------------------------------------------------------------------------------------------------

//INSERIR STATUS ATIVO/INATIVO

INSERT INTO status VALUES (1, 'ATIVO', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

INSERT INTO status VALUES (2, 'INATIVO', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

--------------------------------------------------------------------------------------------------------------------------------------------

//INSERIR PERFIS

INSERT INTO perfis VALUES (1, 'Operacional', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

INSERT INTO perfis VALUES (2, 'Gerencial', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

INSERT INTO perfis VALUES (3, 'TI', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

--------------------------------------------------------------------------------------------------------------------------------------------

//INSERIR TIPOS

INSERT INTO tipos VALUES (1, 'Formulário Operacional', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1)

--------------------------------------------------------------------------------------------------------------------------------------------

//INSERIR TIPO ITENS

INSERT INTO tipo_itens VALUES (1, 'CACP', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1, 1)

INSERT INTO tipo_itens VALUES (2, 'PQA', '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00', 1, 1)

--------------------------------------------------------------------------------------------------------------------------------------------

//INSERIR ANALISES

INSERT INTO analises VALUES (1, 1, '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00')

INSERT INTO analises VALUES (2, 2, '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00')

INSERT INTO analises VALUES (3, 3, '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00')

INSERT INTO analises VALUES (4, 4, '2020-11-07 20:34:39.485+00', '2020-11-07 20:34:39.485+00')

--------------------------------------------------------------------------------------------------------------------------------------------

yarn add @react-native-community/cli-platform-android (Inicialização do APP Android Studio)

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

<Div style{alingnItems: 'center'}> 
 <img src=https://img.shields.io/badge/Licence-Private-blue/> 
  <img src=https://img.shields.io/badge/App-version%201.0-blue/> 
   <img src=https://img.shields.io/badge/Plataform-Android-green/> 
</Div>


 

