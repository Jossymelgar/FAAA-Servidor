"use strict"
var express = require("express");
var TelefonoController =require("../Controladores/telefono");
var api = express.Router();
//rutas para el controlador de direcciones
api.get("/probando-controlador-telefono",TelefonoController.pruebas);
api.post("/save-telefono",TelefonoController.saveTelefono);
api.post("/get-telefono/:id?",TelefonoController.getTelefono);
api.delete("/delete-telefono/:id",TelefonoController.deleteTelefono);
module.exports = api;
