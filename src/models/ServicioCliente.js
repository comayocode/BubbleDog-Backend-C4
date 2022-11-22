const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let scSchema = new Schema({
    //por el momento solo el nombre del servicio hasta aclarar dudas
    servioNombre: {type: String, require: true},
    cedulaCliente:{type: String, require: true},
    fechaEntrega: {type:Date, default: Date.now}
});

module.exports = mongoose.Schema("serviciocliente",scSchema);