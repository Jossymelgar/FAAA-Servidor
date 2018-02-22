"use strict"
var express = require("express");
var ImpresoraController =require("../Controladores/impresora");
var api = express.Router();
//rutas para el controlador de direcciones
api.get("/probando-controlador-impresora",ImpresoraController.pruebas);
api.post("/save-impresora",ImpresoraController.saveImpresora);
api.post("/get-impresora/:id?",ImpresoraController.getImpresora);
api.delete("/delete-impresora/:id",ImpresoraController.deleteImpresora);
module.exports = api;
