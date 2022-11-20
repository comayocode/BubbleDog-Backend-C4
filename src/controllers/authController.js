const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/UsuarioModel");
const { Role } = require("../models/RoleModel");

const registrarse = async (req = request, res = response) => {
  const { username, email, password, roles } = req.body;

  const nuevoUsuario = new Usuario({
    username,
    email,
    password: await Usuario.encryptPassword(password),
  });

  const emailExistente = await Usuario.findOne({ email: email });
  if (emailExistente) {
    return res.status(400).json({
      message: "Este correo ya se encuentra registrado",
    });
  }

  if (roles) {
    const encontrarRole = await Role.find({ name: { $in: roles } });
    nuevoUsuario.roles = encontrarRole.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "usuario" });
    nuevoUsuario.roles = [role._id];
  }
  const savedUsuario = await nuevoUsuario.save();
  console.log(savedUsuario);

  const token = jwt.sign({ id: savedUsuario._id }, process.env.WORD_SECRET, {
    expiresIn: 3600, // 30 minutos
  });
  console.log(token);
  res.status(200).json({ token });
};

const iniciarSesion = async (req = request, res = response) => {
  res.json("Iniciar sesion desde el controlador");
};

module.exports = {
  iniciarSesion,
  registrarse,
};
