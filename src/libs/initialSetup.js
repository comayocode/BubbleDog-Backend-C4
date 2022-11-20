const Role = require("../models/RoleModel");

const createRole = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "admin" }).save(),
      new Role({ name: "moderador" }).save(),
      new Role({ name: "usuario" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
    throw new Error("Error al cargar en la base de datos", error);
  }
};

module.exports = createRole;
