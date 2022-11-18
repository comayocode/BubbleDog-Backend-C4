const mongoose = require("mongoose");

const url = process.env.URL_MONGODB;

const getConexion = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexion a la base de datos correctamente");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectar la Base de Datos");
  }
};

module.exports = {
  getConexion,
};
