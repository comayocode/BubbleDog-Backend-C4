const { request, response } = require("express");
const Cliente = require("../models/ModelCliente");

const createCliente = async (req = request, res = response) => {
  const {
    cedula,
    nombre,
    apellido,
    telefono,
    email,
    nombreMascota,
    raza,
    vacuna,
    obseracion,
  } = req.body;

  const nuevoCliente = new Cliente({
    cedula,
    nombre,
    apellido,
    apellido,
    telefono,
    email,
    nombreMascota,
    raza,
    vacuna,
    obseracion,
  });

  const clienteSave = await nuevoCliente.save();
  res.status(200).json(clienteSave);
};
const getCliente = async (req = request, res = response) => {
  const clientes = await Cliente.find();
  res.status(200).json(clientes);
};

const getClienteById = async (req = request, res = response) => {
  const cliente = req.params.clienteId;
  console.log(cliente);
  const clienteById = await Cliente.findById(cliente);

  res.status(200).json(clienteById);
};
const updateClienteById = async (req = request, res = response) => {
  const clienteActualizado = await Cliente.findByIdAndUpdate(
    req.params.clienteId,
    req.body,
    {
      new: true,
    }
  );
  console.log(clienteActualizado);
  res.status(201).json(clienteActualizado);
};
const deleteClienteById = async (req = request, res = response) => {
  const { clienteId } = req.params;

  const clienteEliminado = await Cliente.findByIdAndDelete(clienteId);

  return res.json(204).json(clienteEliminado);
};

module.exports = {
  createCliente,
  getCliente,
  getClienteById,
  updateClienteById,
  deleteClienteById,
};
