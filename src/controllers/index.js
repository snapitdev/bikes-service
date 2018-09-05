'use strict';

// const Bike = require('../models/bike');

const controller = db => {

  const collection = db.collection('bikes');

  const getAllBikes = () => {

    return new Promise((resolve, reject) => {

      const bikes = [];
      const cursor = collection.find();

      const addBike = (bike) => {
        bikes.push(bike);
      };

      console.log(cursor);

      const sendBike = (err) => {
        if (err) {
          reject(
            new Error('An error occured fetching all bikes, error:' + err)
          );
        }
        resolve(bikes);
      };

      cursor.forEach(addBike, sendBike);
    });
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    getAllBikes,
    disconnect,
  });
};

const connect = connection => {
  // console.log('CONNECTION!!', connection);
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'));
    }
    resolve(controller(connection));
  });
};


module.exports = Object.assign({}, { connect });
