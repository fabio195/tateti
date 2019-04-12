const http = require('http');
const common = require('./common')
const fs = require('fs')

const port = 8283

var jugadas = [];
var jugada

const server = http.createServer((req, res) => {
    let body = [];
    req.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        req.body = body
        jugada = body

        if (req.url === '/guardarTateti') {
            guardarPartida(req, res)
        } else {
            homePage(req, res)
        }

    });

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

function guardarPartida(req, res) {
    var url = req.url
    console.log('jugada: ', jugada)
    if (url === '/guardarTateti') {
        jugadas.push(jugada)
    } else {
        common.handle404(req, res)
    }
    res.end()
    console.log('jugadas: ', jugadas)
}