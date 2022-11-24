const { request, response } = require("express");
const Usuario = require("../models/UsuarioModel");

const createUsuario = async (req = request, res = response) => {
  res.json("Creando un usuario");
};

module.exports = {
  createUsuario,
};
