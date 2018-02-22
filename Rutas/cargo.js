"use strict"
var express = require("express");
var CargoController =require("../Controladores/cargo");
var api = express.Router();
//rutas para el controlador de direcciones
api.get("/probando-controlador-cargo",CargoController.pruebas);
api.post("/save-cargo",CargoController.saveCargo);
api.post("/get-cargo/:id?",CargoController.getCargo);
api.delete("/delete-cargo/:id",CargoController.deleteCargo);
module.exports = api;
