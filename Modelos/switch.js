'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SwitchSchema = Schema({
	nombre_switch: String,
	cantidad_puertos: Number,
	modelo: String,
	marca:String,
	direccion_ip:String,
	vlan: String,
	estado:String,
	obs:String,
	fecha: { type:Date, default: Date.now},
	puertos:[],
	departamento:{type: Schema.ObjectId,ref:'Departamento'}

});
module.exports = mongoose.model('Switch',SwitchSchema);
