'use strict'
//ARCHIVO PARA CONECTAR LA BASE DE DATOS Y PARA CREAR EL PUERTO DEL SERVIDOR
var mongoose = require('mongoose');
var app = require('./app.js');
//CREANDO PUERTO PARA EL SERVIDOR
var port = process.env.PORT || 3977;
mongoose.Promise = global.Promise;
//PUERTO EN EL QUE LA BASE DE DATOS ESTA ESCUCHANDO

mongoose.connect('mongodb://localhost:27017/Inventarios',function(err,res){
	if (err) {
		throw err;
	}else{
		console.log("LA CONEXION A LA BASE DE DATOS FUE EXITOSA (FAAA)");
		app.listen(port,function(){
			console.log('EL SERVIDOR ESTA CORRIENDO EN: http://localhos:3977');
		})
	}
});