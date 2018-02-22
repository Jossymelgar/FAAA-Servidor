"use strict"
var User = require("../Modelos/user");
var bcrypt = require("bcrypt-nodejs");


function pruebas(req,res){
	res.status(200).send({message:"Probando controlador de Uuarios"});
}
//Funcion para guardar un usuario
function GuardarUser(req,res){
	var user = new User();
	var params = req.body;
	user.nombre = params.nombre;
	user.correo = params.correo;
	user.role = "ROLE_ADMIN";
	//chequear si el correo ya existe en la base de datos
	User.findOne({correo:params.correo},function(err1,user) {
	if (err1) {
		if (params.contrasena) {
	   	//incriptar contraseña 
	   	bcrypt.hash(params.contrasena,null,null,function(err,hash){
	   	user.contrasena = hash;
	   	if (user.nombre != null && user.correo !=null && user.role !=null) {
	   		//guardar el usuario
	   		user.save(function(err,userStored){
	   			if (err) {
	   					res.status(500).send({message:"ERROR AL GUARDAR EL USUARIO"});
	   				}else{
	   					if (!userStored) {
	   						res.status(404).send({message:"NO SE LOGRO REGISTRAR EL USUARIO"});
	   					}else{
	   						res.status(200).send({user:userStored});
	   					}
	   				}
	   			})
	   		}else{
	   			res.status(200).send({message:"INTRODUCE TODO LOS CAMPOS"});
	   		}
	   	})
	    }else{
	   		res.status(500).send({message:"INTRODUCE LA CONTRASEÑA"});
	    }
	}else{
		res.status(200).send({message:"EL USUARIO A CREAR YA EXISTE EN LA BASE DE DATOS"})
		
	}
	})
	
}

//FUNCION PARA SACAR EL USUARIO DE LA BASE DE DATOS
function  getUser(req,res) {
	// body...
	var params = req.body;
	var correo = params.correo;
	var contrasena = params.contrasena;

	User.findOne({correo:correo},function(err,user) {
		if (err) {
			res.status(500).send({message:"ERROR EN LA PETICION"});
		}else{
			if (!user) {
				res.status(404).send({message:"USUARIO NO EXISTE"});
			}else{
				//comprobar contraseña si es correcta
				bcrypt.compare(contrasena,user.contrasena,function(err,check){
					if (check) {
						//devolver los datos del usuario
						res.status(200).send({user:user});
					}else{
						res.status(404).send({message:"CONTRASEÑA INCORRECTA"});
					}
				})
			}
		}
	})
}
//fUNCION PARA ACTUALIZAR EL USUARIO
function updateUser(req,res) {
	// body...
	var userid = req.params.id;
	var update = req.body;
	User.findByIdAndUpdate(userid,update,function(err,userUpdated){
		if (err) {
			res.status(500).send({message:"OCURRIO UN ERROR AL MOMENTO DE ACTUALIZAR EL USUARIO"});
		}else{
			if (!userUpdated) {
				res.status(404).send({message:"NO SE PUDO ACTUALIZAR EL USUARIO"});
			}else{
				res.status(200).send({user:userUpdated});
			}
		}
	});
}
function loginUser(req,res) {
	// body...
	var params = req.body;
	var correo = params.correo;
	var contrasena = params.contrasena;
	User.findOne({correo:correo},function(err,user) {
		// body...
		if (err) {
   	       res.status(500).send({message:"ERROR  NO EXISTE EL CORREO"});

		}else{
			if (!user) {
 		 	res.status(404).send({message:"USUARIO NO EXISTEEEE"});

			}else{
				//comprobar contraseña
				bcrypt.compare(contrasena,user.contrasena,function(err,check){
					if (check) {
						res.status(200).send({user:user});
						
					}else{
						res.status(404).send({message:"Usuario no a podido loguearse"});
					}
				})
			}
		}

	})

}
module.exports = {
	pruebas,
	GuardarUser,
	getUser,
	updateUser,
	loginUser
}