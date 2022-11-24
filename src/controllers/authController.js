const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Usuario = require("../models/UsuarioModel");
const Role = require("../models/RoleModel");

const registrarse = async (req = request, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
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
    expiresIn: 28800, // 8 horas
  });
  console.log(token);
  res.status(200).json({ token });
};

const iniciarSesion = async (req = request, res = response) => {
  const { email, password } = req.body;
  //Se traen los datos ingresados por el usuario desde el body
  const userExist = await Usuario.findOne({ email: email }).populate("roles");
  // se verifica si el usuario existe
  if (!userExist) {
    return res
      .status(400)
      .json({ message: "El usuario no existe. Registrerse Por favor" });
  }
  //Se verifica si las contraseñas son iguales
  const passwordExist = await Usuario.comparePassword(
    password,
    userExist.password
  );
  if (!passwordExist) {
    return res.status(401).json({ token: "", message: "Contraseña Invalida" });
  }
  console.log(userExist);

  const token = jwt.sign({ id: userExist._id }, process.env.WORD_SECRET, {
    expiresIn: "1h", // 8 Horas
  });

  res.cookie(String(userExist._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Registrado con exito! ", user: userExist, token });
};

const getUsuario = async (req = request, res = response, next) => {
  const userExist = req.id;
  let user;
  try {
    user = await Usuario.findById(userExist, "-password");
  } catch (error) {
    return new Error(error);
  }

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  return res.status(200).json({ user });
};

const refreshToken = (req = request, res = response, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];

  if (!prevToken) {
    return res.status(400).json({ message: "No se pudo encontrar el token" });
  }

  jwt.verify(String(prevToken), process.env.WORD_SECRET, (error, user) => {
    if (error) {
      console.log(error);
      return res.status(403).json({ message: "Autenticacion fallida" });
    }
    res.clearCookie(`${user.id}`);
    res.cookie[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, process.env.WORD_SECRET, {
      expiresIn: "1h",
    });

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
  });
  next();
};

module.exports = {
  iniciarSesion,
  registrarse,
  getUsuario,
  refreshToken,
};
