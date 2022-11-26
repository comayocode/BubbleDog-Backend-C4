const express = require("express");
const app = express();

app.use(require("./routesCliente"));
app.use(require("./routesServicio"));
app.use(require("./routesMovimiento"));

module.exports = app;
