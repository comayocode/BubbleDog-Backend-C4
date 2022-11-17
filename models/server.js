const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { getConexion } = require("../database/conexionDB");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosLogin = "/api/registrarse";

    //Conectar a la Base de Datos
    this.connectionDB();

    // Middlewares
    this.middleware();

    //Metodo router
    this.router();
  }

  async connectionDB() {
    await getConexion();
  }

  //Middleware
  middleware() {
    //Cors
    this.app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

    //Cookie_Parser
    this.app.use(cookieParser());

    //Lectura y parseo del formato
    this.app.use(express.json());
  }

  //Metodo donde se ejecutan las rutas
  router() {
    this.app.use(this.usuariosLogin, require("../routes/usuarioRouter"));
  }

  // Ejecuta el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto ", this.port);
    });
  }
}

module.exports = Server;
