//Se realizara el codigo despues de aclarar dudas
const { Router } = require("express");
const {
  getDetalleServicio,
  getDetalleServicioById,
  createDetalleServicio,
  deleteDetalleServicioById,
} = require("../controllers/detalleServicioController");

const router = Router();

router.post("/", createDetalleServicio);

router.get("/", getDetalleServicio);

router.get("/:idDetalle", getDetalleServicioById);

router.delete("/:idDetalle", deleteDetalleServicioById);

module.exports = router;
