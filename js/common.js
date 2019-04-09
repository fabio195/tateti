const url = require('url');

// Handler del 404
function handle404(req, res) {
    res.writeHead(404)
    res.write(`${url.parse(req.url).pathname} No se encuentra`)
    res.end()
}

exports.handle404 = handle404