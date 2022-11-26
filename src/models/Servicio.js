const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let servicioSchema = new Schema({
    nombreServicio : {type : String, require:true},
    costoServicio: {type : Number, require:true},
    detalleServicio: {type : String}
});

module.exports = mongoose.model("servicio",servicioSchema);