/* En esta funcion se verifica si existe token para obtener el acceso */
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const RoleModel = require("../models/RoleModel");
const Usuario = require("../models/UsuarioModel");

const verifyToken = async (req = request, res = response, next) => {
  /* try {
    //Se obtiene el token y se captura en la constante token
    const token = req.headers["token"];
    console.log(token);
    //Se verifica si el token no existe para capturar un error
    if (!token)
      return res.status(404).json({ message: "No se encontro ningun token" });

    //Verificar el token existente con jsonwebtoken
    jwt.verify(String(token), process.env.WORD_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Token Invalido" });
      }
      console.log(user.id);
      req.id = user.id;
    });

    //Se verifica si el el id del token existe o verdadero o true
    const user = await Usuario.findById(req.id, { password: 0 });
    if (!user) return res.status(404).json({ message: "Usuario no existe" });
    console.log(user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token no autorizado" });
  } */

  const cookie = req.headers.cookie;
  const token = cookie.split("=")[1];
  console.log(token);

  if (!token) {
    res.status(404).json({ message: "No se encontro el token" });
  }

  jwt.verify(String(token), process.env.WORD_SECRET, (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Token invalido" });
    }
    console.log(user.id);
    req.id = user.id;
  });

  next();
};

const userAdmin = async (req = request, res = response, next) => {
  const userAdmin = await Usuario.findById(req.userId);
  //console.log(userAdmin);
  const userRole = await RoleModel.find({ _id: { $in: userAdmin.roles } });
  console.log(userRole);

  for (let i = 0; i < userRole.length; i++) {
    if (userRole[i].name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "Requiere del role administrador" });
};

module.exports = {
  verifyToken,
  userAdmin,
};
