const express = require("express");
const app = express();

const userRoute = require("./userRoute");
const appRoute = require("./aplikasiRoute");
const tierRoute = require("./tierRoute");

app.use("/user", userRoute);
app.use("/app", appRoute);
app.use("/tier", tierRoute);
app.use(express.static(__dirname));

module.exports = app;
