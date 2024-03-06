const express = require(`express`);
const app = express();
app.use(express.json());
const transaksiController = require(`../controller/transaksiController`);
const { adminOnly, authorization } = require("../middlewares/authValidation");

app.get("/", authorization, adminOnly, transaksiController.getAllTransaksi);
// app.post("/find", authorization, adminOnly, transaksiController.findApp);
app.post("/", authorization, transaksiController.addTransaksi);
// app.put("/:id", authorization, adminOnly, transaksiController.updateAplikasi);
// app.delete("/:id", authorization, adminOnly, transaksiController.deleteAplikasi);

module.exports = app;
