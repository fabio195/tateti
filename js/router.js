var url = require('url')

// funcion que maneja todo el routeo

// function route(routes, req, res) {
//     try {

//     }
// }

function handle404(req, res) {
    res.writeHead(404)
    res.write(`${url.parse(req.url).pathname} No se encuentra`)
    res.end()
}

exports.handle404 = handle404