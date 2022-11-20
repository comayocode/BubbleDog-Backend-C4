const { Schema, model } = require("mongoose");

const newServicio = Schema(
  {
    nombreServicio: String,
    costoServicio: Number,
    detalleServicio: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Servicio", newServicio);
