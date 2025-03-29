// api/tasks.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router({ tasks: [] }); // Caminho para o arquivo db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Adicionando a rota da API
server.use('/tasks', router);

// Inicia o servidor
module.exports = server;
