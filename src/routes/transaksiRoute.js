const express = require(`express`);
const router = express.Router();
const transaksiController = require(`../controller/transaksiController`);
const { adminOnly, authorization } = require("../middlewares/auth");
const { transactionValidation } = require("../middlewares/validation");

router.get("/", authorization, adminOnly, transaksiController.getAllTransaksi);
router.get(
  "/find/:id",
  authorization,
  transaksiController.getTransaksiById,
);
router.post(
  "/filter",
  authorization,
  transaksiController.filterTransaksi,
);
router.post(
  "/",
  authorization,
  transactionValidation,
  transaksiController.addTransaksi,
);
router.put(
  "/:id",
  authorization,
  transaksiController.updateStatusTransaksi,
);

module.exports = router;
