const { response, request } = require("express");
const Servicio = require("../models/ServicioModel");

// Funcion para crear un servicio
const createServicios = async (req = request, res = response) => {
  console.log(req.body);
  const { nombreServicio, costoServicio, detalleServicio } = req.body;

  const newService = new Servicio({
    nombreServicio,
    costoServicio,
    detalleServicio,
  });

  const serviceSave = await newService.save();
  res.status(201).json(serviceSave);
};

// Funcion para obtener todos los servicios
const getServicios = async (req = request, res = response) => {
  // Obtener todos los productos con el metodo find
  const services = await Servicio.find();
  console.log(services);
  res.status(200).json(services);
};

// Funcion para obtener un servicio por ID
const getServiciosById = async (req = request, res = response) => {
  const service = req.params.servicioId;
  const serviceById = await Servicio.findById(service);
  res.status(200).json(serviceById);
};

// Funcion para actualizar un servicio por ID
const updateServiciosById = async (req = request, res = response) => {
  const serviceUpdate = await Servicio.findByIdAndUpdate(
    req.params.servicioId,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(serviceUpdate);
};

// Funcion para eliminar un servicio por ID
const deleteServiciosById = async (req = request, res = response) => {
  const { servicioId } = req.params;
  await Servicio.findByIdAndDelete(servicioId);
  return res.status(204).json({ message: "Servicio eliminado" });
};

module.exports = {
  getServicios,
  getServiciosById,
  createServicios,
  updateServiciosById,
  deleteServiciosById,
};
