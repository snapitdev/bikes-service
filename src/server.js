'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const bikesAPI = require('./api/bikes');
require('./models/bike');

const start = (options) => {
  // console.log(options.bikes);
  return new Promise((resolve, reject) => {

    if (!options.bikes) {
      reject(
        new Error('The server must be started with a connected controller')
      );
    }

    if (!options.port) {
      reject(new Error('The server must be started with an available port'));
    }

    const app = express();

    app.use(morgan('dev'));
    app.use(helmet());
    app.use(bodyParser.json());

    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err));
      res.status(500).send('Something went wrong!');
    });

    // console.log("APP", app);
    // console.log("OPTIONS", options);

    bikesAPI(app, options);

  });
};

module.exports = Object.assign({}, { start });
