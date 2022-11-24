const { Router } = require("express");
const { check } = require("express-validator");
const {
  registrarse,
  iniciarSesion,
  getUsuario,
  refreshToken,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authJwt");
const router = Router();

// Estas rutas son para el inicio se sesion y el registro y va con el método POST
router.post(
  "/registrarse",
  [check("email", "El email no es valido").isEmail()],
  registrarse
);
router.post("/iniciarSesion", iniciarSesion);
router.get("/user", verifyToken, getUsuario);
router.get("/refresh", refreshToken, verifyToken, getUsuario);

module.exports = router;
