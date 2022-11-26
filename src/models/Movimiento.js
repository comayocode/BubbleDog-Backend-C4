const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let movimientoSchema = new Schema({
    cedulaCliente:{type: String, require: true},
    clienteNombre:{type: String, require: true},
    servicioNombre: {type: String, require: true},
    costoTotal:{type: String, require: true},
    fechaEntrega: {type:Date, default: Date.now}
});

module.exports = mongoose.model("movimiento",movimientoSchema);