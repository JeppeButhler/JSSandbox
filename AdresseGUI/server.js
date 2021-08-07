'use strict';
var http = require('http');
var port = 4000;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('Hello World\n');
}).listen(port);

