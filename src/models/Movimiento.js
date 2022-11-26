const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let movimientoSchema = new Schema({
    clienteId:{type: String, require: true},
    servicioId: [{type:String}],
    fechaEntrega: {type:Date, default: Date.now}
});

module.exports = mongoose.model("movimiento",movimientoSchema);