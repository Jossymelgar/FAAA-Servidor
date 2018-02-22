'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DepartamentoSchema = Schema({
	nombre_dep: String,
	nombre_direc: {type: Schema.ObjectId,ref:'Direccion'}
});
module.exports = mongoose.model('Departamento',DepartamentoSchema);
