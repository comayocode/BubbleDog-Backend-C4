const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let movimientoSchema = require("../models/Movimiento");

router.route("/listar-movimiento").get((req, res) => {
  movimientoSchema.find((error, data) => {
    if (error) {
      console.log(error);
      return (error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/crear-movimiento").post((req, res) => {
    movimientoSchema.create(req.body, (error, data) => {
      if (error) {
        console.log(error);
        return (error);
      } else {
        console.log(data);
        console.log("movimiento creado con exito");
        res.json(data);
      }
    });
  });


  router.route("/borrar-movimiento/:id").delete((req, res) => {
    movimientoSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
      return (error);
    } else {
      console.log(data);
      console.log("movimiento eliminado con exito");
      res.status(200).json({
        msg: data,
      });
    }
  });
});

  module.exports = router;