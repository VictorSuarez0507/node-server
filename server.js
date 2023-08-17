const http = require('http');
const port = 3000; 
const host = "localhost";
const data = require("./index.js")

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/tasks' ) {
    const newTask = data.tasks;     
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newTask)); 
  } else {
    res.statusCode = 404;
    res.end('No se encuentra ruta');
  }
});

server.listen(port, host, () => {
    console.log(`Servidor iniciado en http://${host}:${port}`);
});


