const { Router } = require("express");
const { check } = require("express-validator");
const { registrarse, iniciarSesion } = require("../controllers/authController");
const router = Router();

// Estas rutas son para el inicio se sesion y el registro y va con el método POST
router.post(
  "/registrarse",
  [check("email", "El email no es valido").isEmail()],
  registrarse
);
router.post("/iniciarSesion", iniciarSesion);

module.exports = router;
