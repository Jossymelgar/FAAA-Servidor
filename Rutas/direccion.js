"use strict"
var express = require("express");
var DireccionController =require("../Controladores/direccion");
var api = express.Router();
//rutas para el controlador de direcciones
api.get("/probando-controlador-derecciones",DireccionController.pruebas);
api.post("/save-direccion",DireccionController.saveDirecciones);
api.post("/get-direccion/:id?",DireccionController.getDireccion);
api.delete("/delete-direccion/:id",DireccionController.deleteDireccion);
api.post("/update-direccion/:id",DireccionController.updateUser);
module.exports = api;
