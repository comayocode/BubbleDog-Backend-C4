const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

//Para la ceración de cada usuario y rol del proyecto
const usuarioSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    //De esta manera se hace una relacion entre collections de Schemas con MongoDB
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

usuarioSchema.statics.encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync();
  return await bcrypt.hash(password, salt);
};

usuarioSchema.statics.comparePassword = async (password, passwordRecibido) => {
  return await bcrypt.compare(password, passwordRecibido);
};

module.exports = model("Usuario", usuarioSchema);
