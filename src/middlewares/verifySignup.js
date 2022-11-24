/*Esta funcion se verifica si el usuarioya existe no se puede duplicar */
const { request, response } = require("express");
const ROLES = ["admin", "usuario", "moderator"];
const verificarRolesExistentes = async (
  req = request,
  res = response,
  next
) => {
  const userRoles = req.body.roles;
  if (userRoles) {
    for (let i = 0; i < userRoles.length; i++) {
      if (!ROLES.includes(userRoles[i])) {
        return res.status(400).json({
          message: `Role ${userRoles[i]} no existe`,
        });
      }
    }
  }
  console.log(ROLES);

  next();
};

module.exports = verificarRolesExistentes;
