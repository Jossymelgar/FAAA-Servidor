"use strict"
var Impresora = require("../Modelos/impresora");
function pruebas(req,res){
	res.status(200).send({message:"Probando controlador de impresora"});
}

function saveImpresora(req,res){
	var impresora = new Impresora();
	var params = req.body;
	impresora.nombre_impresora = params.nombre_impresora;
	impresora.tipo = params.tipo;
	impresora.tipo_tinta = params.tipo_tinta;
	impresora.modelo = params.modelo;
	impresora.marca = params.marca;
	impresora.estado = params.estado;
	impresora.obser = params.obser;
	impresora.nombre_dep = params.nombre_dep;
	impresora.save(function(err,exito){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION DEL SERVIDOR"});
		}else{
			if (!exito) {
				res.status(404).send({message:"ERROR AL MOMENTO DE GUARDAR 	LA IMPRESORA"})
			}else{
				res.status(200).send({impresora:exito});
			}
		}
	});
}
function getImpresora(req,res){
	var params = req.params.id;
	console.log("******************")
	console.log(params);
	if (params) {
		Impresora.findById(params).populate(
			{
				path:"nombre_dep",
				populate: {
					path:"nombre_direc",
					model: "Direccion"
				}
			}
			).exec(function(err,impresora){
			if (err) {
				res.status(500).send({message:"ERROR EN LA PETICION"});
			}else{
				if (!impresora) {
					res.status(404).send({message:"NO EXISTE LA IMPRESORA"});
				}else{
					res.status(200).send({impresora:impresora});
				}
			}
	});
		
	
	}else{
		Impresora.find({}).populate(
			{
				path:"nombre_dep",
				populate: {
					path:"nombre_direc",
					model: "Direccion"
				}
			}
			).exec(function(err,impresora){
			if (err) {
				res.status(500).send({message:"ERROR EN LA PETICION"});
			}else{
				if (!impresora) {
					res.status(404).send({message:"NO EXISTE LA IMPRESORA"});
				}else{
					res.status(200).send({impresora});
				}
			}
	});
		
	}
	
}

function deleteImpresora(req,res){
	console.log("****************************************")
	var impresoraId = req.params.id;
	if (!impresoraId) {
		res.status(200).send({message:"EL ID NO LLEGO CORRECTAMENTE"});
	}else{
		Impresora.findByIdAndRemove(impresoraId,function(err,remuved){
			if (err) {
				res.status(500).send({message:"OCURRIO UN ERROR EN LA PETICION EN LA BASE DE DATOS"});
			}else{
				if (!remuved) {
					res.status(404).send({message:"NO SE ELIMINO LA IMPRESORA"});
				}else{
					res.status(200).send({impresora:remuved});
				}
			}
		})
	}
}

module.exports = {
	pruebas,
	saveImpresora,
	getImpresora,
	deleteImpresora
	
	
}