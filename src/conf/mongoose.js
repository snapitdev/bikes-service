'use strict';

const mongoose = require('mongoose');

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur +
    ',', 'mongodb://' + `${options.user}:${encodeURIComponent(options.pass)}@`);
  return `${url.substr(0, url.length - 1)}` +
    `/${options.db}?replicaSet=${options.repl}` +
    '&authSource=admin&w=1';
};

const getSettings = (options) => {
  return {
    w: 'majority',
    useNewUrlParser: true,
    readPreference: 'ReadPreference.SECONDARY_PREFERRED',
    native_parser: false,
    autoReconnect: true,
    poolSize: 10,
    keepAlive: 300,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    ha: true,
    haInterval: 10000,
    user: options.user,
    pass: options.pass,
  };
};

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    mongoose.connect(getMongoURL(options), getSettings(options), (err, db) => {
      if (err) {
        mediator.emit('db.error', err);
        // console.log(err);
      }
      mediator.emit('db.ready', db);
      // console.log(db);
    });
    // .then(
    //   (db) => {
    //     mediator.emit('db.ready', db);
    //   },
    //   (err) => {
    //     mediator.emit('db.error', err);
    //   }
    // );
  });
};

module.exports = Object.assign({}, { connect });
