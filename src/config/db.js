// var mongoose = require('mongoose');
const mongoose = require('mongoose');
const { compare_passwords } = require('../utils/passwordHash');
const { password, username } = require('./keys');


const mongo = mongoose
  .connect(
    `mongodb+srv://Praygram:${password}@cluster0.nqtxdrr.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => console.log('DB connected Dont lose focus!'));

module.exports = mongo;
