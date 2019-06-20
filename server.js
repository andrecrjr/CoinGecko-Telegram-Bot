var express = require('express');

require('./bot')();

var app = express();

app.get('/', function (req, res) {
  res.json({ 'bot':'refresh this to bot come back' });
});

let port = process.env.PORT || 3000


var server = app.listen(port,"0.0.0.0", function () {
  var host = server.address().address;
  var port = server.address().port;

});

