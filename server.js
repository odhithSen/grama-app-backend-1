var http = require("http");
var _NAME = "kd";

http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end(_NAME);
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');