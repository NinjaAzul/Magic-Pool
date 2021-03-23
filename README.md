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



<h1 align="center">
<a href="https://www.figma.com/file/oJNAybsPgrCFaAOxtkvhrX?embed_host=share&kind=&node-id=0%3A1&viewer=1"><img alt="Figma" src="https://camo.githubusercontent.com/42b5cd94dbe9961d5b1071ea4dae36e2b63d35a8e6e56e7bf91fedf28988c80c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6669676d612532302d2532334632344531452e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6669676d61266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/figma%20-%23F24E1E.svg?&amp;style=for-the-badge&amp;logo=figma&amp;logoColor=white" style="max-width:100%;"></a>
</h1> 


# ✅ Demonstração da aplicação

<h1 align="center">
  <img src=mobile/public/GitinputPadding.gif />
 
 ## Demo App 
</h1>
<h1 align="center">
 <a href="https://www.linkedin.com/posts/erick-freitas-048064134_reactnative-activity-6769379522686070784-nbsA"><img alt="LinkedIn" src="https://camo.githubusercontent.com/8bb7c1de40aadb0d8eede2add7716932344b30235088d239831fe0e884de8f82/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2532302d2532333030373742352e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&amp;style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width:100%;"></a>
</h1>

<button class="inline-block px-4 py-2 text-center text-white transition bg-black rounded shadow ripple waves-light hover:shadow-lg hover:bg-black focus:outline-none flex flex-row-reverse m-0.5 justify-items-center items-center"><svg class="w-10 h-10 text-white fill-current ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="cls-2" d="M17.36 6.24a1.4 1.4 0 0 1 1.4 1.4v9.72a1.4 1.4 0 0 1-1.4 1.4H7.64a1.4 1.4 0 0 1-1.4-1.4V7.64a1.4 1.4 0 0 1 1.4-1.4h9.72m0-.6H7.64a2 2 0 0 0-2 2v9.72a2 2 0 0 0 2 2h9.72a2 2 0 0 0 2-2V7.64a2 2 0 0 0-2-2z" fill="#454b57"/><path id="path0_fill" data-name="path0 fill" class="cls-3" d="M10.79 17.63a1.71 1.71 0 0 0 1.71-1.71v-1.71h-1.71a1.71 1.71 0 1 0 0 3.42z" fill="#0acf83"/><path id="path1_fill" data-name="path1 fill" class="cls-4" d="M9.08 12.5a1.71 1.71 0 0 1 1.71-1.71h1.71v3.42h-1.71a1.71 1.71 0 0 1-1.71-1.71z" fill="#a259ff"/><path id="path1_fill-2" data-name="path1 fill" class="cls-5" d="M9.08 9.08a1.71 1.71 0 0 1 1.71-1.71h1.71v3.42h-1.71a1.71 1.71 0 0 1-1.71-1.71z" fill="#f24e1e"/><path id="path2_fill" data-name="path2 fill" class="cls-6" d="M12.5 7.38h1.71a1.71 1.71 0 1 1 0 3.42H12.5z" fill="#ff7262"/><path id="path3_fill" data-name="path3 fill" class="cls-7" d="M15.92 12.5a1.71 1.71 0 1 1-1.71-1.71 1.71 1.71 0 0 1 1.71 1.71z" fill="#1abcfe"/></g><path class="cls-8" fill="none" d="M0 0h25v25H0z"/></svg<<strong> Figma </strong></button>


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


 

