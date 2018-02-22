//CREANDO LOS CONTROLADORES DE RUTAS Y CONFIGURACION DE CABECERAS
'use strict'
var express = require ('express');
var bodyParser = require('body-parser');
var app = express();
//carga derutas
var user_rutas= require("./Rutas/user");
var direccion_rutas= require("./Rutas/direccion");
var user_rutas= require("./Rutas/user");
var departamento_rutas= require("./Rutas/departamento");
var cargo_rutas= require("./Rutas/cargo");
var empleados_rutas= require("./Rutas/empleado");
var telefono_rutas= require("./Rutas/telefono");
var impresora_rutas= require("./Rutas/impresora");
var pc_rutas= require("./Rutas/pc");
var switch_rutas= require("./Rutas/switch");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configuracion de cabeceras
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Authorization, X-API-KEY, Origin, X-Resquested-With, Content-Type, Accept, Access-Allow-Request-Method");
	res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE");
	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
})

// rutas de base
app.use("/api",user_rutas);
app.use("/api",direccion_rutas);
app.use("/api",departamento_rutas);
app.use("/api",cargo_rutas);
app.use("/api",empleados_rutas);
app.use("/api",telefono_rutas);
app.use("/api",impresora_rutas);
app.use("/api",pc_rutas);
app.use("/api",switch_rutas);
//PRUEBA DE UN METODO GET

module.exports = app;