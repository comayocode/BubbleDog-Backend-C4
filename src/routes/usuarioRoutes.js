const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.json("Obteniendo usuarios");
});

module.exports = router;
