"use strict"
var Pc = require("../Modelos/pc");
function pruebas(req,res){
	res.status(200).send({message:"Probando controlador de pc"});
}

function savePc(req,res){
	var pc = new Pc();
	var params = req.body;
	pc.nombre_pc = params.nombre_pc;
	pc.tipo_pc = params.tipo_pc;
	pc.dire_ip_tar_red = params.dire_ip_tar_red;
	pc.dire_mac_tar_red = params.dire_mac_tar_red;
	pc.dire_ip_wifi = params.dire_ip_wifi;
	pc.dire_mac_wifi = params.dire_mac_wifi;
	pc.tipo_procesador = params.tipo_procesador;
	pc.memoria_ram = params.memoria_ram;
	pc.disco_duro = params.disco_duro;
	pc.monitor = params.monitor;
	pc.teclado = params.teclado;
	pc.activa = params.activa;
	pc.s_o = params.s_o;
	pc.antivirus = params.antivirus;
	pc.modelo = params.modelo;
	pc.marca = params.marca;
	pc.estado = params.estado;
	pc.obser = params.obser;
	pc.impresora = params.impresora;
	pc.nombre_dep = params.nombre_dep;
	//pc.date = params.date;
	pc.save(function(err,exito){
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION DEL SERVIDOR"});
		}else{
			if (!exito) {
				res.status(404).send({message:"ERROR AL MOMENTO DE GUARDAR 	LA PC"})
			}else{
				res.status(200).send({pc:exito});
			}
		}
	});
}
function getPc(req,res){
	var params = req.params.id;
	console.log("******************")
	console.log(params);
	if (params) {
		Pc.findById(params).populate(
			{
				path:"impresora",
				path: "Departamento"

			}
			).exec(function(err,pc){
			if (err) {
				res.status(500).send({message:"ERROR EN LA PETICION"});
			}else{
				if (!pc) {
					res.status(404).send({message:"NO EXISTE LA PC"});
				}else{
					res.status(200).send({pc:pc});
				}
			}
	});
		
	
	}else{
		//Query para extraer las pc's con sus relaciiones 
		Pc.find({}).
  				populate('impresora').
  				populate('nombre_dep').
  				exec(function(err,pc){
						if (err) {
							res.status(500).send({message:"ERROR EN LA PETICION"});
						}else{
							if (!pc) {
								res.status(404).send({message:"NO EXISTE LA PC"});
							}else{
								res.status(200).send({pc});
							}
						}
				});


		
	}
	
}

function deletePc(req,res){
	console.log("****************************************")
	var pcId = req.params.id;
	if (!pcId) {
		res.status(200).send({message:"EL ID NO LLEGO CORRECTAMENTE"});
	}else{
		Pc.findByIdAndRemove(pcId,function(err,remuved){
			if (err) {
				res.status(500).send({message:"OCURRIO UN ERROR EN LA PETICION EN LA BASE DE DATOS"});
			}else{
				if (!remuved) {
					res.status(404).send({message:"NO SE ELIMINO LA PC"});
				}else{
					res.status(200).send({pc:remuved});
				}
			}
		})
	}
}

module.exports = {
	pruebas,
	savePc,
	getPc,
	deletePc
	
	
}