"use strict"
var Cargo = require("../Modelos/cargo");
function pruebas(req,res){
	res.status(200).send({message:"Probando controlador de Cargo"});
}

function saveCargo(req,res){
	var cargo = new Cargo();
	var params = req.body;
	cargo.nombre_cargo = params.nombre_cargo;
	cargo.nombre_dep = params.nombre_dep;
	cargo.save(function(err,exito){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION DEL SERVIDOR"});
		}else{
			if (!exito) {
				res.status(404).send({message:"ERROR AL MOMENTO DE GUARDAR 	EL CARGO"})
			}else{
				res.status(200).send({cargo:exito});
			}
		}
	});
}
function getCargo(req,res){
	var params = req.params.id;
	console.log("******************")
	console.log(params);
	if (params) {
		Cargo.findById(params).populate(
			{
				path:"nombre_dep",
				populate: {
					path: "nombre_direc",
					model: "Direccion"
				}
			}).exec(function(err,cargo){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!cargo) {
				res.status(404).send({message:"NO EXISTE EL CARGO"});
			}else{
				res.status(200).send({cargo});
			}


		}
	});
	}else{
		var find = Cargo.find({}).sort("nombre_cargo");
		find.populate(
			{
				path:"nombre_dep",
				populate: {
					path: "nombre_direc",
					model: "Direccion"
				}
			}).exec(function(err,cargo){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!cargo) {
				res.status(404).send({message:"NO HAY CARGOS"});
			}else{
				res.status(200).send({cargo:cargo});
			}
		}
	})
		
	}
	
}

//Elimina cargo
function deleteCargo(req,res){
	console.log("****************************************")
	var cargoId = req.params.id;
	if (!cargoId) {
		res.status(200).send({message:"EL ID NO LLEGO CORRECTAMENTE"});
	}else{
		Cargo.findByIdAndRemove(cargoId,function(err,remuved){
			if (err) {
				res.status(500).send({message:"OCURRIO UN ERROR EN LA PETICION EN LA BASE DE DATOS"});
			}else{
				if (!remuved) {
					res.status(404).send({message:"NO SE ELIMINO EL CARGO"});
				}else{
					res.status(200).send({cargo:remuved});
				}
			}
		})
	}
}
module.exports = {
	pruebas,
	saveCargo,
	getCargo,
	deleteCargo
	
}