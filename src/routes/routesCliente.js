const { Router } = require("express");
const {
  createCliente,
  getCliente,
  updateClienteById,
  deleteClienteById,
  getClienteById,
} = require("../controllers/clienteController");
const router = Router();

//crear cliente
router.post("/", createCliente);

//Leer cliente
router.get("/", getCliente);

//Leer cliente
router.get("/:clienteId", getClienteById);

//actualizar cliente
router.put("/:clienteId", updateClienteById);

//Borrar cliente
router.delete("/:clienteId", deleteClienteById);

module.exports = router;
