var express = require('express');
var app = express();

const port = 8080

app.listen(port, '0.0.0.0', () => {
  console.log('Escuchando en el puerto: ' + port);
});

//routes
app.use('/v1', require('./api/v1/wheather.controller.v1'));

module.exports = app;
