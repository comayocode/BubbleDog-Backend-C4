const { request, response } = require("express");
//const ModelCliente = require("../models/ModelCliente");
const DetalleServicio = require("../models/ModelDetalleServicio");

const createDetalleServicio = async (req = request, res = response) => {
  console.log(req.body);
  const { id_servicio, id_cliente } = req.body;

  const newDetalleServicio = new DetalleServicio({
    id_servicio,
    id_cliente,
  });

  const detalleServicioSave = await newDetalleServicio.save();
  console.log(detalleServicioSave);
  res.status(200).json(detalleServicioSave);
};

const getDetalleServicio = async (req = request, res = response, next) => {
  try {
    const detalles = await DetalleServicio.find()
      .populate("id_servicio", { servicioId: 0 })
      .populate("id_cliente", { clienteId: 0 });
    console.log(detalles);
    res.status(200).json(detalles);
  } catch (error) {
    console.log(error);
  }
  next();
};

const getDetalleServicioById = async (req = request, res = response) => {
  const detalle = req.params.idDetalle;
  const detalleId = await DetalleServicio.findById(detalle).populate(
    "id_cliente",
    { id: 0 }
  );
  console.log(detalleId);
  res.status(200).json(detalleId);
};

const deleteDetalleServicioById = async (req = request, res = response) => {
  const { detalleId } = req.params;
  await DetalleServicio.findByIdAndDelete(detalleId);

  return res.json(detalleId);
};

module.exports = {
  getDetalleServicio,
  createDetalleServicio,
  getDetalleServicioById,
  deleteDetalleServicioById,
};
