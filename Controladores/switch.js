"use strict"
var Switch = require("../Modelos/switch");
function pruebas(req,res){
	res.status(200).send({message:"Probando controlador de switch"});
}

function saveSwitch(req,res){
	var switch_ = new Switch();
	var params = req.body;
	switch_.nombre_switch = params.nombre_switch;
	switch_.cantidad_puertos = params.cantidad_puertos;
	switch_.modelo = params.modelo;
	switch_.marca = params.marca;
	switch_.direccion_ip = params.direccion_ip;
	switch_.vlan = params.vlan;
	switch_.estado = params.estado;
	switch_.obs = params.obs;
	switch_.puertos = params.puertos;
	switch_.departamento = params.departamento;
	console.log(params.puertos)
	switch_.save(function(err,exito){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION DEL SERVIDOR"});
		}else{
			if (!exito) {
				res.status(404).send({message:"ERROR AL MOMENTO DE GUARDAR 	EL SWITCH"})
			}else{
				res.status(200).send({switch:exito});
			}
		}
	});
}
function getSwitch(req,res){
	var params = req.params.id;
	if (params) {
		Switch.findById(params).populate(
			{
				path:"departamento"
			}).exec(function(err,switch_){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!switch_) {
				res.status(404).send({message:"NO EXISTE EL SWITCH"});
			}else{
				res.status(200).send({switch_});
			}


		}
	});
	}else{
		Switch.find({}).populate(
			{
				path:"departamento"
			}).exec(function(err,switch_){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!switch_) {
				res.status(404).send({message:"NO EXISTE EL SWITCH"});
			}else{
				res.status(200).send({switch_});
			}


		}
	});
	}
}

function deleteSwitch(req,res){
	var params = req.params.id;
	Switch.findByIdAndRemove(params,function(err,switch_){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!switch_) {
				res.status(500).send({message:"NO EXISTE EL SWITCH"});
			}else{
				res.status(200).send({switch:switch_})
			}
		}
	})

}
module.exports = {
	pruebas,
	saveSwitch,
	getSwitch,
	deleteSwitch
	
}