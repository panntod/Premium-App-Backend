const express = require(`express`);
const router = express.Router();

const aplikasiController = require(`../controller/aplikasiController`);
const { adminOnly, authorization } = require("../middlewares/authValidation");

router.get("/", aplikasiController.getAllApp);
router.get("/statistik", aplikasiController.getStatistik);
router.get("/tier", aplikasiController.getTierData);
router.post("/find", aplikasiController.findApp);
router.post("/findByID/:aplikasiID", aplikasiController.findAppByID);
router.post("/findByTier/:tierID", aplikasiController.findAppByTier);
router.post("/", authorization, adminOnly, aplikasiController.addAplikasi);
router.put("/:id", authorization, adminOnly, aplikasiController.updateAplikasi);
router.delete(
  "/:id",
  authorization,
  adminOnly,
  aplikasiController.deleteAplikasi,
);

module.exports = router;
