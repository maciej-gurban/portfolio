var http = require('http');
var fs = require('fs');
var serveStaticFiles = require('ecstatic')({ root: __dirname + '/static' });
var port = process.env.PORT || 8000;

http.createServer(function (req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.url.indexOf('/ad') === 0) {
    return require('./mock-api/http-handle-ads')(req, res);
  }
  if (req.url.indexOf('/api') === 0) {
    return require('./mock-api/http-handle-api')(req, res);
  }
  // default: handle the request as a static file
  serveStaticFiles(req, res);

}).listen(port);

console.log('Mock API listening on http://localhost:%d', port);
