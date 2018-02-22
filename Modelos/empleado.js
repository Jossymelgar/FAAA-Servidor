var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmpleadoSchema = Schema({
	nombre_empleado: String,
	correo:String,
	nombre_cargo: {type: Schema.ObjectId,ref:'Cargo'}
});
module.exports = mongoose.model('Empleado',EmpleadoSchema);
