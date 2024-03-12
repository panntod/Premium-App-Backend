const express = require("express");
const app = express();

const userRoute = require("./userRoute");
const appRoute = require("./aplikasiRoute");
const tierRoute = require("./tierRoute");
const transaksiRoute = require("./transaksiRoute");
const { logMiddleware } = require("../middlewares/log");
const authorization = require("../middlewares/authValidation");

app.use(logMiddleware);
app.use(express.json());
app.use(express.static(__dirname));

app.use("/user", userRoute);
app.use("/app", appRoute);
app.use("/tier", tierRoute);
app.use("/transaksi", transaksiRoute);
app.use("/login", authorization.authentication);

module.exports = app;
