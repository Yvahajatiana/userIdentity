const http = require('http');
const startup = require('./startup');
const port = process.env.port || 3000;
const server = http.createServer(startup);

server.listen(port);
