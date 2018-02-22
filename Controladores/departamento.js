"use strict"
var Departamento = require("../Modelos/departamento");
function pruebas(req,res){
	res.status(200).send({message:"Probando controlador de departamento"});
}

function saveDepartamento(req,res){
	var departamento = new Departamento();
	var params = req.body;
	departamento.nombre_dep = params.nombre_dep;
	departamento.nombre_direc = params.nombre_direc;
	departamento.save(function(err,exito){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION DEL SERVIDOR"});
		}else{
			if (!exito) {
				res.status(404).send({message:"ERROR AL MOMENTO DE GUARDAR 	EL dEPARTAMENTO"})
			}else{
				res.status(200).send({departamento:exito});
			}
		}
	});
}
function getDepartamento(req,res){
	var params = req.params.id;
	console.log("******************")
	console.log(params);
	if (params) {
		Departamento.findById(params).populate({path:"nombre_direc"}).exec(function(err,departamento){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!departamento) {
				res.status(404).send({message:"NO EXISTE EL DEPARTAMENTO"});
			}else{
				res.status(200).send({departamento});
			}


		}
	});
	}else{
		var find = Departamento.find({}).sort("nombre_dep");
		find.populate({path:"nombre_direc"}).exec(function(err,dep){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!dep) {
				res.status(404).send({message:"NO HAY DEPARTAMENTOS"});
			}else{
				res.status(200).send({departamento:dep});
			}
		}
	})
		
	}
	
}

//Elimina direcciones
function deleteDepartamento(req,res){
	console.log("****************************************")
	var depId = req.params.id;
	if (!depId) {
		res.status(200).send({message:"EL ID NO LLEGO CORRECTAMENTE"});
	}else{
		Departamento.findByIdAndRemove(depId,function(err,remuved){
			if (err) {
				res.status(500).send({message:"OCURRIO UN ERROR EN LA PETICION EN LA BASE DE DATOS"});
			}else{
				if (!remuved) {
					res.status(404).send({message:"NO SE ELIMINO EL DEPARTAMENTO"});
				}else{
					res.status(200).send({departamento:remuved});
				}
			}
		})
	}
}
module.exports = {
	pruebas,
	saveDepartamento,
	getDepartamento,
	deleteDepartamento
	
}