const express = require(`express`);
const app = express();
app.use(express.json());
const aplikasiController = require(`../controller/aplikasiController`);
const { adminOnly, authorization } = require("../middlewares/authValidation");

app.get("/", authorization, adminOnly, aplikasiController.getAllApp);
app.post("/find", authorization, adminOnly, aplikasiController.findApp);
app.post("/", authorization, aplikasiController.addAplikasi);
app.put("/:id", authorization, adminOnly, aplikasiController.updateAplikasi);
app.delete("/:id", authorization, adminOnly, aplikasiController.deleteAplikasi);

module.exports = app;
