'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PcSchema = Schema({
	nombre_pc: String,
	tipo_pc:String,
	dire_ip_tar_red:String,
	dire_mac_tar_red:String,
	dire_ip_wifi:String,
	dire_mac_wifi:String,
	tipo_procesador:String,
	memoria_ram:String,
	disco_duro:String,
	monitor:String,
	teclado:String,
	activa:String,
	s_o:String,
	antivirus:String,
	modelo:String,
	marca:String,
	estado:String,
	obser:String,
	impresora:  {type: Schema.ObjectId,ref:'Impresora'},	
	nombre_dep: {type: Schema.ObjectId,ref:'Departamento'},
	date: { type:Date, default: Date.now}
});
module.exports = mongoose.model('Pc',PcSchema);
