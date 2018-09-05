'use strict';
require('dotenv').config();
const { EventEmitter } = require('events');
const server = require('./src/server');
const controller = require('./src/controllers');
const config = require('./src/conf');
const mediator = new EventEmitter();

console.log('--- Bikes Service ---');
console.log('Connecting to bikes controller');

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

mediator.on('db.ready', (db) => {
  let rep;
  controller.connect(db)
    .then(cont => {
      console.log(cont, 'Connected. Starting Server');
      rep = cont;
      return server.start({
        port: config.serverSettings.port,
        ssl: config.serverSettings.ssl,
        cont,
      });
    })
    .then(app => {
      console.log(app, 'Server started succesfully, running on port:');
      app.on('close', () => {
        rep.disconnect();
      });
    });
});

mediator.on('db.error', (err) => {
  console.error(err);
});

config.db.connect(config.dbSettings, mediator);

mediator.emit('boot.ready');
