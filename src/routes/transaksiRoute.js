const express = require(`express`);
const app = express();
app.use(express.json());
const transaksiController = require(`../controller/transaksiController`);
const { adminOnly, authorization } = require("../middlewares/authValidation");
const { transactionValidation } = require("../middlewares/validation");

app.get("/", authorization, adminOnly, transaksiController.getAllTransaksi);
app.get("/find/:userID", authorization, transaksiController.getTransaksiById);
app.post(
  "/",
  authorization,
  transactionValidation,
  transaksiController.addTransaksi
);
app.put(
  "/:transaksiID",
  authorization,
  adminOnly,
  transaksiController.updateStatusTransaksi
);
app.delete(
  "/:transaksiID",
  authorization,
  adminOnly,
  transaksiController.deleteTransaksi
);

module.exports = app;
