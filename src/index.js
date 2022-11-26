require("./config/config")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

const backRoutes = require("./routes/routes");

const db = require("./database/db").mongoURIlocal;


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Conexion con exito"))
  .catch((err) => console.log(err));


app.set("port", process.env.PORT);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/APIREST",backRoutes);


//iniciando Servidor
app.listen(app.get("port"), () => {
  console.log("Server escuchando por el puerto : " + app.get("port"));
});


app.use(function(err,req,res,next){
  console.error(err.message)
  if(!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message);
})