'use strict';
const mongoose = require('mongoose');

const BikeSchema = mongoose.Schema({
  brand: String,
  type: String,
  color: String,
});

module.exports = mongoose.model('Bike', BikeSchema);
