"use strict"
var express = require("express");
var UserController =require("../Controladores/user");
var api = express.Router();
//rutas para el controlador de usuarios
api.get("/probando-controlador",UserController.pruebas);
api.post("/save-user",UserController.GuardarUser);
api.post("/get-user",UserController.getUser);
api.post("/update-user/:id",UserController.updateUser);
api.post("/login-user",UserController.loginUser);
module.exports = api;
