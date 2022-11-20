const { Router } = require("express");
const {
  getServicios,
  getServiciosById,
  createServicios,
  updateServiciosById,
  deleteServiciosById,
} = require("../controllers/serviciosController");
const router = Router();

router.get("/", getServicios);

router.get("/:servicioId", getServiciosById);

router.post("/", createServicios);

router.put("/:servicioId", updateServiciosById);

router.delete("/:servicioId", deleteServiciosById);

module.exports = router;
