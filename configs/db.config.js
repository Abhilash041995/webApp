
const mongoose = require('mongoose');
const Promise = require('bluebird')

const conn = mongoose.connect('mongodb://abhi:Admin123!@ds115931.mlab.com:15931/crazyapp');
mongoose.Promise = Promise;

module.exports = conn;