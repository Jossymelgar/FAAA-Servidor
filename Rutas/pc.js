"use strict"
var express = require("express");
var PcController =require("../Controladores/pc");
var api = express.Router();
//rutas para el controlador de direcciones
api.get("/probando-controlador-pc",PcController.pruebas);
api.post("/save-pc",PcController.savePc);
api.post("/get-pc/:id?",PcController.getPc);
api.delete("/delete-pc/:id",PcController.deletePc);
module.exports = api;
