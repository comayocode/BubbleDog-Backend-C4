const { response, request } = require("express");
const Usuario = require("../models/usuarioModel");

const getUsuarios = (req = request, res = response) => {
  res.json({
    message: "Metodo get - Controller",
  });
};
const postUsuarios = (req = request, res = response) => {
  const { nombre, email, password } = req.body;
  res.json({
    message: "Metodo post - Controller",
    nombre,
    email,
    password,
  });
};

const putUsuarios = (req = request, res = response) => {
  res.json({
    message: "Metodo put - Controller",
  });
};

const patchUsuarios = (req = request, res = response) => {
  res.json({
    message: "Metodo patch - Controller",
  });
};

const deleteUsuarios = (req = request, res = response) => {
  res.json({
    message: "Metodo delete - Controller",
  });
};

module.exports = {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
  patchUsuarios,
};
