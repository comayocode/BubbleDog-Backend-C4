const mongoose = require("mongoose");
const urlDB = process.env.MONGODB_URL;

const connectionDB = async () => {
  try {
    await mongoose.connect(urlDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conexion a la base de datos correctamente");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectar la base de datos", error);
  }
};

module.exports = connectionDB;
