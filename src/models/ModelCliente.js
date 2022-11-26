const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let clienteSchema = new Schema(
  {
    cedula: {
      type: String,
      require: true,
      unique: true,
    },
    nombre: {
      type: String,
      require: true,
    },
    apellido: {
      type: String,
      require: true,
    },
    telefono: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    nombreMascota: {
      type: String,
      require: true,
    },
    raza: {
      type: String,
    },
    vacuna: {
      type: Boolean,
      default: false,
    },
    obseracion: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Cliente", clienteSchema);
