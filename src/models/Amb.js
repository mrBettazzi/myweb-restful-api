// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AmbSchema   = new Schema({
    name: String,
    url: String,
    credentials: String,
    notes: String
});

module.exports = mongoose.model('Amb', AmbSchema);
