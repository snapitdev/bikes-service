const { dbSettings, serverSettings } = require('./config');
const db = require('./mongoose')

module.exports = Object.assign({}, { dbSettings, serverSettings, db })
