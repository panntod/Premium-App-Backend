const express = require(`express`);
const router = express.Router();

const tierController = require(`../controller/tierController`);
const { tierValidation } = require("../middlewares/validation");
const { adminOnly, authorization } = require("../middlewares/authValidation");

router.get("/", authorization, adminOnly, tierController.getAllTier);
router.post("/find/", authorization, tierController.findTier);
router.post("/", authorization, adminOnly, tierValidation, tierController.addTier);
router.put("/:id", authorization, adminOnly, tierController.updateTier);
router.delete("/:id", authorization, adminOnly, tierController.deleteTier);

module.exports = router;
