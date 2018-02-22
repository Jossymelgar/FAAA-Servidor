'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ImpresoraSchema = Schema({
	nombre_impresora: String,
	tipo:String,
	tipo_tinta:String,
	modelo:String,
	marca:String,
	estado:String,
	obser:String,
	date: { type:Date, default: Date.now},
	nombre_dep: {type: Schema.ObjectId,ref:'Departamento'}
});
module.exports = mongoose.model('Impresora',ImpresoraSchema);
