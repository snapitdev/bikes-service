const bikeController = db => {
  console.log(db);
  return db;
};

const disconnect = () => {
  // db.close()
};

return Object.create({
  // getAllBikes,
  // getAllMovies,
  // getMoviePremiers,
  // getMovieById,
  // disconnect
});

const connect = connection => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error("connection db not supplied!"));
    }
    resolve(bikeController(connection));
  });
};

module.exports = Object.assign({}, { connect })
