"use strict"
var Empleado = require("../Modelos/empleado");
function pruebas(req,res){
	res.status(200).send({message:"Probando controlador de Empleado"});
}

function saveEmpleado(req,res){
	var empleado = new Empleado();
	var params = req.body;
	empleado.nombre_empleado = params.nombre_empleado;
	empleado.correo = params.correo;
	empleado.nombre_cargo = params.nombre_cargo;
	empleado.save(function(err,exito){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION DEL SERVIDOR"});
		}else{
			if (!exito) {
				res.status(404).send({message:"ERROR AL MOMENTO DE GUARDAR 	EL EMPLEADO"})
			}else{
				res.status(200).send({empleado:exito});
			}
		}
	});
}
function getEmpleado(req,res){
	var params = req.params.id;
	console.log("******************")
	console.log(params);
	if (params) {
		Empleado.findById(params).populate(
			{
				path:"nombre_cargo",
				populate: {
					path: "nombre_dep",
					model: "Departamento",
					populate: {
						path: "nombre_direc",
						model: "Direccion"
					}
				}
			}).exec(function(err,empleado){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!empleado) {
				res.status(404).send({message:"NO EXISTE EL EMPLEADO"});
			}else{
				res.status(200).send({empleado});
			}


		}
	});
	}else{
		var find = Empleado.find({}).sort("nombre_empleado");
		find.populate(
			{
				path:"nombre_cargo",
				populate: {
					path: "nombre_dep",
					model: "Departamento",
					populate: {
						path: "nombre_direc",
						model: "Direccion"
					}
				}
			}).exec(function(err,empleado){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!empleado) {
				res.status(404).send({message:"NO HAY EMPLEADOS"});
			}else{
				res.status(200).send({empleado:empleado});
			}
		}
	})
		
	}
	
}

//Elimina empleado
function deleteEmpleado(req,res){
	console.log("****************************************")
	var empleadoId = req.params.id;
	if (!empleadoId) {
		res.status(200).send({message:"EL ID NO LLEGO CORRECTAMENTE"});
	}else{
		Empleado.findByIdAndRemove(empleadoId,function(err,remuved){
			if (err) {
				res.status(500).send({message:"OCURRIO UN ERROR EN LA PETICION EN LA BASE DE DATOS"});
			}else{
				if (!remuved) {
					res.status(404).send({message:"NO SE ELIMINO EL EMPLEADO"});
				}else{
					res.status(200).send({empleado:remuved});
				}
			}
		})
	}
}
module.exports = {
	pruebas,
	saveEmpleado,
	getEmpleado,
	deleteEmpleado
	
}