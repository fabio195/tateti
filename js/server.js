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
    switch (`${req.url}`) {
        case '/home':
            fs.readFile('../index.html', function read(err, data) {
                if (err) {
                    common.handle404(req, res)
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                res.end()
            });
            break;
        case '/js/tateti.js':
            fs.readFile('./tateti.js', function read(err, data) {
                if (err) {
                    common.handle404(req, res)
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/javascript' })
                res.write(data)
                res.end()
            })
            break;
        default:
            common.handle404(req, res)
            break;
    }
}