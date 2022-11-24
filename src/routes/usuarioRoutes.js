const { Router } = require("express");
const router = Router();

const { createUsuario } = require("../controllers/usuarioController");
const { verifyToken, userAdmin } = require("../middlewares/authJwt");
const verificarRolesExistentes = require("../middlewares/verifySignup");

router.post(
  "/",
  [verifyToken, userAdmin, verificarRolesExistentes],
  createUsuario
);

module.exports = router;
