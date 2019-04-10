const http = require('http');
const common = require('./common')
const fs = require('fs')

const port = 8283

const server = http.createServer((req, res) => {
    const routes = {
        '/home': {
            method: 'GET',
            handler: homePage(req, res)
        }
    }

})

server.listen(port)
console.log('Servidor andando en el puerto: ', port)

function homePage(req, res) {
    var url = req.url
    if (url === "/") {
        url = "/index.html"
    }

    fs.readFile('../www' + url, function read(err, data) {
        if (err) {
            common.handle404(req, res)
            return;
        }
        if (url.indexOf(".js") > 0) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' })
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
        }
        res.write(data)
        res.end()
    });
}