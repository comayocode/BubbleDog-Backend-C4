const { response, request } = require("express");
const Usuario = require("../models/usuarioModel");

const getUsuarios = (req = request, res = response) => {
  res.json({
    message: "Metodo get - Controller",
  });
};
const postUsuarios = (req = request, res = response) => {
  res.json({
    message: "Metodo post - Controller",
  });
};
const putUsuarios = (req = request, res = response) => {
  res.json({
    message: "Metodo put - Controller",
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
};
