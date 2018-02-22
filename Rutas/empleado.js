"use strict"
var express = require("express");
var EmpleadoController =require("../Controladores/empleado");
var api = express.Router();
//rutas para el controlador de direcciones
api.get("/probando-controlador-empleado",EmpleadoController.pruebas);
api.post("/save-empleado",EmpleadoController.saveEmpleado);
api.post("/get-empleado/:id?",EmpleadoController.getEmpleado);
api.delete("/delete-empleado/:id",EmpleadoController.deleteEmpleado);
module.exports = api;
