'use strict';

const mongoose = require('mongoose');

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur + ',', 'mongodb://');
  return `
    ${url.substr(0, url.length - 1)}/${options.db}?replicaSet=${options.repl}
  `;
};

const getSettings = (options) => {
  return {
    db: { native_parser: true },
    server: { poolSize: 3 },
    replset: { rs_name: 'rs1' },
    user: options.user,
    pass: options.pass,
  };
};

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {

    mongoose.connect(getMongoURL(options), getSettings(options)).then(
      (db) => {
        console.log('yes!', db);
        mediator.emit('db.ready', db);
      },
      (err) => {
        console.log(err);
        mediator.emit('db.error', err);
      }
    );
  });
};

module.exports = Object.assign({}, { connect });
