'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DireccionSchema = Schema({
	nombre: String
})
module.exports = mongoose.model('Direccion',DireccionSchema);
