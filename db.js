const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL);

module.exports.connect = () => {
  return mongoose.connect(MONGODB_URL);
};
