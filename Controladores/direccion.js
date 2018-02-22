"use strict"
var Direcciones = require("../Modelos/direccion");
var Departamento = require("../Modelos/departamento")
function pruebas(req,res){
	res.status(200).send({message:"Probando controlador de direccion"});
}

function saveDirecciones(req,res){
	var direcciones = new Direcciones();
	var params = req.body;
	direcciones.nombre = params.nombre;
	direcciones.save(function(err,exito){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION DEL SERVIDOR"});
		}else{
			if (!exito) {
				res.status(404).send({message:"ERROR AL MOMENTO DE GUARDAR LA DIRECCION"})
			}else{
				res.status(200).send({Direccion:exito});
			}
		}
	});
}
function getDireccion(req,res){
	var params = req.params.id;

	if (params) {
		Direcciones.findOne({_id:params},function(err,direccionesStorage) {
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!direccionesStorage) {
				res.status(404).send({message:"DIRECCION NO EXISTE"});
			}else{
				
				res.status(200).send({Direccion:direccionesStorage});
			}
		}
		})
	}else{
		Direcciones.find({},function(err,exito){
			if (err) {
				res.status(500).send({message:"	ERROR EN LA PETICION"});
			}else{
				if (!exito) {
					res.status(404).send({message:"ERROR AL EXTRAER LAS DIRECCIONES"});
				}else{
					res.status(200).send({direccion:exito});
				}
			}
		})
	}
	
}

//Elimina direcciones
function deleteDireccion(req,res){
	console.log("entre al metodo borrar")
	var direcId = req.params.id;
	
	Departamento.find({nombre_direc:direcId},function(err,departamento){
		if (err) {
			
		}else{
				if (!direcId || departamento.length != 0) {
					res.status(404).send({message:"LA DIRECCION ESTA SIGNADA A UN DEPARTAMENTO POR LO TANTO NO SE PUEDE ELIMINAR"});
				}else{
					Direcciones.findByIdAndRemove(direcId,function(err,remuved){
						if (err) {
							res.status(500).send({message:"OCURRIO UN ERROR EN LA PETICION EN LA BASE DE DATOS"});
						}else{
							if (!remuved) {
								res.status(404).send({message:"NO SE ELIMINO LA DIRECCION"});
							}else{
								res.status(200).send({Direccion:remuved});
							}
						}
					})
				}

			


		}
	});
	
	
}
function updateUser(req,res) {
	// body...
	var direccionid = req.params.id;
	var update = req.body;
	Direcciones.findByIdAndUpdate(direccionid,update,function(err,direccionUpdated){
		if (err) {
			res.status(500).send({message:"ERROR AL ACTUALIZAR LA DIRECCION"});
		}else{
			if (!direccionUpdated) {
				res.status(404).send({message:" NO SE HA PODIDO ACTUALIZAR"});
			}else{
				res.status(200).send({direccion:direccionUpdated});
			}
		}
	});
}
module.exports = {
	pruebas,
	saveDirecciones,
	getDireccion,
	deleteDireccion,
	updateUser
	
}