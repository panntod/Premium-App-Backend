const express = require("express");
const app = express();

const userRoute = require("./userRoute");
const appRoute = require("./aplikasiRoute");
const transaksiRoute = require("./transaksiRoute");
const { logMiddleware } = require("../middlewares/log");
const authorization = require("../middlewares/auth");

app.use(logMiddleware);
app.use(express.json());

app.use("/user", userRoute);
app.use("/app", appRoute);
app.use("/transaksi", transaksiRoute);
app.use("/login", authorization.authentication);

module.exports = app;
