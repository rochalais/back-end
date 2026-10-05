# Sistema de Gerenciamento de Academia

## Integrantes

* Sarah Alves de Oliveira
* Nicole Gimenez Machado
* Laís Joana Marcondes da Rocha
* Arthur Henrique Caron

## Descrição do Projeto

Este projeto consiste em um **Sistema de Gerenciamento de Academia**, desenvolvido para facilitar o cadastro e o gerenciamento de informações relacionadas aos alunos e aos planos da academia.

O sistema permite realizar operações de **CRUD (Create, Read, Update e Delete)** para alunos e planos, além de utilizar diferentes bancos de dados de acordo com o tipo de informação armazenada.

O projeto utiliza **PostgreSQL**, por meio do Sequelize, para armazenar os dados estruturados do sistema, e **MongoDB**, por meio do Mongoose, para armazenar informações relacionadas às fichas e aos treinos.

A aplicação foi desenvolvida utilizando **Node.js e Express** como base para o Back-End.

## Tecnologias Utilizadas

* Node.js
* Express
* PostgreSQL
* Sequelize
* MongoDB
* Mongoose
* JavaScript
* HTML

## Estrutura do Sistema

O sistema possui, entre outras, as seguintes funcionalidades:

* Cadastro de planos;
* Listagem de planos;
* Busca de plano por ID;
* Atualização de planos;
* Exclusão de planos;
* Cadastro de alunos;
* Listagem de alunos;
* Busca de aluno por ID;
* Atualização de alunos;
* Exclusão de alunos;
* Consulta de alunos por plano;
* Relacionamento entre planos e alunos;
* Armazenamento de dados utilizando PostgreSQL e MongoDB.

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* **Node.js**
* **PostgreSQL**
* **MongoDB**

Também é recomendado possuir o **Git** para clonar o repositório.

## Instalação das Dependências

Após clonar o projeto, abra o terminal na pasta do projeto.

Exemplo:

```bash
cd back-end
```

Instale as dependências do projeto utilizando:

```bash
npm install
```

Esse comando irá instalar todas as dependências presentes no arquivo `package.json`.

## Configuração do PostgreSQL

É necessário possuir um banco de dados PostgreSQL configurado para o projeto.

Crie um banco de dados para a aplicação e confira as informações de conexão utilizadas no arquivo de configuração do Sequelize.

As informações necessárias normalmente são:

* Nome do banco de dados;
* Usuário;
* Senha;
* Host;
* Porta.

A porta padrão do PostgreSQL é:

```text
5432
```

Também é necessário garantir que o serviço do PostgreSQL esteja em execução antes de iniciar a aplicação.

## Configuração do MongoDB

O projeto também utiliza MongoDB para o armazenamento das informações relacionadas às fichas e aos treinos.

É necessário possuir uma instância do MongoDB em execução e configurar a conexão de acordo com as informações utilizadas pelo projeto.

Caso seja utilizado o MongoDB localmente, a conexão normalmente utiliza a porta:

```text
27017
```

## Execução do Projeto

Após instalar as dependências e configurar os bancos de dados, execute o projeto com:

```bash
node app.js
```

Se tudo estiver configurado corretamente, será exibida uma mensagem semelhante a:

```text
Servidor no http://localhost:8081
```

Depois disso, a aplicação poderá ser acessada pelo navegador em:

```text
http://localhost:8081
```

## Testando o Sistema

Com o servidor em execução, é possível acessar as rotas da aplicação pelo navegador ou por ferramentas de teste de API, como o Postman.

### Planos

As principais rotas relacionadas aos planos são:

```text
GET    /planos
POST   /planos
GET    /planos/:id
PUT    /planos/:id
DELETE /planos/:id
```

Também existem páginas para cadastro, atualização e exclusão:

```text
GET /planos/cadastro
GET /planos/atualizar
GET /planos/deletar
```

### Alunos

As principais rotas relacionadas aos alunos são:

```text
GET    /alunos
POST   /alunos
GET    /alunos/:id
PUT    /alunos/:id
DELETE /alunos/:id
```

Também existem páginas para cadastro, atualização e exclusão:

```text
GET /alunos/cadastro
GET /alunos/atualizar
GET /alunos/deletar
```

É possível também consultar os alunos vinculados a um determinado plano utilizando o parâmetro:

```text
GET /alunos?planoId=1
```

Nesse exemplo, serão retornados os alunos associados ao plano de ID `1`.

## Informações Adicionais para Teste

Para testar corretamente o sistema:

1. Certifique-se de que o **PostgreSQL** esteja em execução.
2. Certifique-se de que o **MongoDB** esteja em execução.
3. Confira se as configurações de conexão dos bancos estão corretas.
4. Na pasta do projeto, execute:

```bash
npm install
```

5. Inicie o servidor:

```bash
node app.js
```

6. Acesse:

```text
http://localhost:8081
```

Para testar os métodos `POST`, `PUT` e `DELETE`, recomenda-se utilizar o **Postman** ou outra ferramenta semelhante.

Os dados cadastrados devem respeitar os campos definidos pelos modelos do sistema, incluindo o vínculo do aluno com um plano existente.

## Observação

O sistema foi desenvolvido como projeto acadêmico da disciplina de **Programação Web Back-End**, com o objetivo de aplicar conceitos de desenvolvimento de APIs, programação orientada a objetos em JavaScript, bancos de dados relacionais e não relacionais, CRUD, relacionamentos e persistência de dados.
