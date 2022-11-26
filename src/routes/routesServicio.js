const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let servicioSchema = require("../models/Servicio");

//crear servicio
router.route("/crear-servicio").post((req, res) => {
    servicioSchema.create(req.body, (error, data) => {
      if (error) {
        console.log(error);
        return (error);
      } else {
        console.log(data);
        console.log("servicio creado con exito");
        res.json(data);
      }
    });
  });
  
  //Leer servicio
  router.route("/listar-servicio").get((req, res) => {
    servicioSchema.find((error, data) => {
      if (error) {
        console.log(error);
        return (error);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  });

  //actualizar servicio
  router.route("/actualizar-servicio/:id").put((req, res) => {
    servicioSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          console.log(error);
          return (error);
        } else {
          console.log(data);
          console.log("servicio actualizado con exito");
          res.json(data);
        }
      }
    );
  });

  //Borrar servicio
router.route("/borrar-servicio/:id").delete((req, res) => {
    servicioSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
      return (error);
    } else {
      console.log(data);
      console.log("servicio eliminado con exito");
      res.status(200).json({
        msg: data,
      });
    }
  });
});

  module.exports = router;