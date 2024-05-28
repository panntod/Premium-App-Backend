const express = require(`express`);
const router = express.Router();

const aplikasiController = require(`../controller/aplikasiController`);
const { adminOnly, authorization } = require("../middlewares/auth");

router.get("/", aplikasiController.getAllApp);
router.get("/statistik", aplikasiController.getStatistik);
router.post("/find", aplikasiController.findApp);
router.post("/findByID/:aplikasiID", aplikasiController.findAppByID);
router.post("/", authorization, adminOnly, aplikasiController.addAplikasi);
router.put("/:id", authorization, adminOnly, aplikasiController.updateAplikasi);
router.delete(
  "/:id",
  authorization,
  adminOnly,
  aplikasiController.deleteAplikasi,
);

module.exports = router;
