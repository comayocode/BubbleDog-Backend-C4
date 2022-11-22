const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let clienteSchema = require("../models/Cliente");

router.route("/crear-clinte").post((req, res, next) => {
    clienteSchema.create(req.body, (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log(data);
        console.log("Cliente creado con exito");
        res.json(data);
      }
    });
  });
  
  //Leer Estudiantes
  router.route("/listar-cliente").get((req, res, next) => {
    clienteSchema.find((error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  });

  module.exports = router;