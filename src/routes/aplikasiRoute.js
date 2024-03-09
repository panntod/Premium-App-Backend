const express = require(`express`);
const app = express();
app.use(express.json());

const aplikasiController = require(`../controller/aplikasiController`);
const { adminOnly, authorization } = require("../middlewares/authValidation");

app.get("/", aplikasiController.getAllApp);
app.post("/find", aplikasiController.findApp);
app.post("/", authorization, adminOnly, aplikasiController.addAplikasi);
app.put("/:id", authorization, adminOnly, aplikasiController.updateAplikasi);
app.delete("/:id", authorization, adminOnly, aplikasiController.deleteAplikasi);

module.exports = app;
