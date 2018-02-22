"use strict"
var express = require("express");
var SwitchController =require("../Controladores/switch");
var api = express.Router();
//rutas para el controlador de direcciones
api.get("/probando-controlador-cargo",SwitchController.pruebas);
api.post("/save-switch",SwitchController.saveSwitch);
api.post("/get-switch/:id?",SwitchController.getSwitch);
api.delete("/delete-switch/:id",SwitchController.deleteSwitch);
module.exports = api;
