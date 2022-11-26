const mongoose = require("mongoose");
const ModelCliente = require("./ModelCliente");
const ServicioModel = require("./ServicioModel");

let Schema = mongoose.Schema;

let scSchema = new Schema({
  id_servicio: {
    type: Schema.ObjectId,
    ref: ServicioModel,
  },
  id_cliente: {
    type: Schema.ObjectId,
    ref: ModelCliente,
  },
  fechaEntrega: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Detalle_Servicios", scSchema);
