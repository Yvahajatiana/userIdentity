require('dotenv').config();
const http = require('http');
const startup = require('./startup');
const port = process.env.PORT || 3000;
console.log("server run with port: "+port);
const server = http.createServer(startup);

server.listen(port);
