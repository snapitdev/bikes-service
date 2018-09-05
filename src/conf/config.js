'use strict';

const dbSettings = {
  db: process.env.DB,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  repl: process.env.DB_REPLS,
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    '192.168.99.100:27017',
    '192.168.99.101:27017',
    '192.168.99.102:27017',
  ],
  dbParameters: () => ({

  }),
  serverParameters: () => ({

  }),
  replsetParameters: (replset = 'rs1') => ({

  }),
};

const serverSettings = {
  port: process.env.PORT || 3000,
};

module.exports = Object.assign({}, { dbSettings, serverSettings });
