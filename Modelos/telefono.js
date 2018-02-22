'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TelefonoSchema = Schema({
	nombre_telefono: String,
	extencion:String,
	d_ip_tele:String,
	d_mac_tele:String,
	modelo:String,
	marca:String,
	estado:String,
	obser:String,
	puerto_lan : String,
	puerto_pc: {type: Schema.ObjectId,ref:'PC'},
	date: { type:Date, default: Date.now},
	nombre_dep: {type: Schema.ObjectId,ref:'Departamento'}
});
module.exports = mongoose.model('Telefono',TelefonoSchema);
