var express = require('express');
var packageInfo = require('./package.json');

require('./bot')();

var app = express();

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

let port = process.env.PORT || 3000


var server = app.listen(port,"0.0.0.0", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});

