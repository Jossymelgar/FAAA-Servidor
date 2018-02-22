"use strict"
var Telefono = require("../Modelos/telefono");
function pruebas(req,res){
	res.status(200).send({message:"Probando controlador de telefono"});
}

function saveTelefono(req,res){
	var telefono = new Telefono();
	var params = req.body;
	telefono.nombre_telefono = params.nombre_telefono;
	telefono.extencion = params.extencion;
	telefono.d_ip_tele = params.d_ip_tele;
	telefono.d_mac_tele = params.d_mac_tele;
	telefono.modelo = params.modelo;
	telefono.marca = params.marca;
	telefono.estado = params.estado;
	telefono.obser = params.obser;
	telefono.puerto_lan = params.puerto_lan;
	if (params.puerto_pc) {
		telefono.puerto_pc = params.puerto_pc;
	}
	
	//telefono.date = params.date;
	telefono.nombre_dep = params.nombre_dep;


	telefono.save(function(err,exito){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION DEL SERVIDOR"});
		}else{
			if (!exito) {
				res.status(404).send({message:"ERROR AL MOMENTO DE GUARDAR 	EL TELEFONO"})
			}else{
				res.status(200).send({telefono:exito});
			}
		}
	});
}
function getTelefono(req,res){
	var params = req.params.id;
	console.log("******************")
	console.log(params);
	if (params) {
		Telefono.findById(params).populate(
			{
				path:"nombre_dep",
				populate: {
					path:"nombre_direc",
					model: "Direccion"
				}
			}
			).exec(function(err,telefono){
			if (err) {
				res.status(500).send({message:"ERROR EN LA PETICION"});
			}else{
				if (!telefono) {
					res.status(404).send({message:"NO EXISTE EL TELEFONO"});
				}else{
					res.status(200).send({telefono});
				}
			}
	});
		
	
	}else{
		Telefono.find({}).populate(
			{
				path:"nombre_dep",
				populate: {
					path:"nombre_direc",
					model: "Direccion"
				}
			}
			).exec(function(err,telefono){
			if (err) {
				res.status(500).send({message:"ERROR EN LA PETICION"});
			}else{
				if (!telefono) {
					res.status(404).send({message:"NO EXISTE EL TELEFONO"});
				}else{
					res.status(200).send({telefono});
				}
			}
	});
		
	}
	
}

function deleteTelefono(req,res){
	console.log("****************************************")
	var telefonoId = req.params.id;
	if (!telefonoId) {
		res.status(200).send({message:"EL ID NO LLEGO CORRECTAMENTE"});
	}else{
		Telefono.findByIdAndRemove(telefonoId,function(err,remuved){
			if (err) {
				res.status(500).send({message:"OCURRIO UN ERROR EN LA PETICION EN LA BASE DE DATOS"});
			}else{
				if (!remuved) {
					res.status(404).send({message:"NO SE ELIMINO EL TELEFONO"});
				}else{
					res.status(200).send({telefono:remuved});
				}
			}
		})
	}
}

module.exports = {
	pruebas,
	saveTelefono,
	getTelefono,
	deleteTelefono
	
	
}