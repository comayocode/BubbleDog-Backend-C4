const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectionDB = require("../databases/conexionDB");
const createRole = require("../libs/initialSetup");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathServicios = "/api/servicios";
    this.pathUsuarios = "/api/users";
    this.pathAuthUsuario = "/api/auth";

    // Cuando inicia el servidor la app crea los roles
    this.getRoles();

    // Se ejecutan los Middlewares
    this.middlewares();

    //Conexion a la DB
    this.getConnection();

    // Se ejecuntan las Rutas
    this.routes();
  }

  async getRoles() {
    await createRole();
  }

  async getConnection() {
    await connectionDB();
  }

  routes() {
    this.app.use(this.pathServicios, require("../routes/serviciosRoutes"));
    this.app.use(this.pathUsuarios, require("../routes/usuarioRoutes"));
    this.app.use(this.pathAuthUsuario, require("../routes/authRoutes"));
  }

  middlewares() {
    this.app.use(morgan("dev"));
    // Uso de los cors
    this.app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    this.app.use(cookieParser());

    this.app.use(express.json());

    // Carpeta de elementos estaticos
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Servidor corriendo en el puerto http://localhost:${this.port}`
      );
    });
  }
}

module.exports = Server;
