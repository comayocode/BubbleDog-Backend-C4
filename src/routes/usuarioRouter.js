const { Router } = require("express");
const {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
  patchUsuarios,
} = require("../controllers/usuarioController");

const router = Router();

router.get("/", getUsuarios);

router.post("/", postUsuarios);

router.patch("/", patchUsuarios);

router.put("/:id", putUsuarios);

router.delete("/:id", deleteUsuarios);

module.exports = router;
