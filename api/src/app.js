const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

//! EXPERIMENTAL: Visto en este video "REST API Mistakes Every Junior Developer should Avoid | clean-code" 
const setCache = function (req, res, next) {
  //Periodo de tiempo por el que quiero que el cache se guarde en el navegador
  const period = 60 * 5;
  //Sólo quiero que se guarde el cache de los GET, no de los POST o DELETE
  if (req.method == "GET") {
    res.set("Cache-Control", `public, max-age=${period}`);
  } else {
    //Para las otras request especifico que no quiero que se guarden bajo ningun caso (caso contrario, podrían guardarse algunas veces)
    res.set("Cache-Control", `no-store`);
  }
  // next() para que pase a la siguiente request
  next();
}

server.use(setCache);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
