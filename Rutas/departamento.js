"use strict"
var express = require("express");
var DepartamentoController =require("../Controladores/departamento");
var api = express.Router();
//rutas para el controlador de direcciones
api.get("/probando-controlador-departamento",DepartamentoController.pruebas);
api.post("/save-departamento",DepartamentoController.saveDepartamento);
api.post("/get-departamento/:id?",DepartamentoController.getDepartamento);
api.delete("/delete-departamento/:id",DepartamentoController.deleteDepartamento);
module.exports = api;
