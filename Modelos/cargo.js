'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CargoSchema = Schema({
	nombre_cargo: String,
	nombre_dep: {type: Schema.ObjectId,ref:'Departamento'}
	
	
});
module.exports = mongoose.model('Cargo',CargoSchema);
