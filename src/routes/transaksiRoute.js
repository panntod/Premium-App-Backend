const express = require(`express`);
const router = express.Router();
const transaksiController = require(`../controller/transaksiController`);
const { adminOnly, authorization } = require("../middlewares/authValidation");
const { transactionValidation } = require("../middlewares/validation");

router.get(
  "/", 
  authorization, 
  adminOnly, 
  transaksiController.getAllTransaksi
);

router.get(
  "/find/:userID", 
  authorization, 
  transaksiController.getTransaksiById
);

router.post(
  "/",
  authorization,
  transactionValidation,
  transaksiController.addTransaksi
);
router.put(
  "/:transaksiID",
  authorization,
  transaksiController.updateStatusTransaksi
);
router.delete(
  "/:transaksiID",
  authorization,
  adminOnly,
  transaksiController.deleteTransaksi
);

module.exports = router;
