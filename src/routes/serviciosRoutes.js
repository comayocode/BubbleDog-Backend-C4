const { Router } = require("express");
const router = Router();
const {
  getServicios,
  getServiciosById,
  createServicios,
  updateServiciosById,
  deleteServiciosById,
} = require("../controllers/serviciosController");
const { userAdmin, verifyToken } = require("../middlewares/authJwt");

router.get("/", getServicios);

router.get("/:servicioId", getServiciosById);

router.post("/", [verifyToken, userAdmin], createServicios);

router.put("/:servicioId", [verifyToken, userAdmin], updateServiciosById);

router.delete("/:servicioId", [verifyToken, userAdmin], deleteServiciosById);

module.exports = router;
