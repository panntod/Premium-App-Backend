const express = require(`express`);
const router = express.Router();
const userController = require(`../controller/userController`);
const {
  registerValidation,
  topUpValidation,
  updateUserValidation,
} = require("../middlewares/validation");
const { adminOnly, authorization } = require("../middlewares/auth");

// User
router.get("/", authorization, adminOnly, userController.getAllUser);
router.post("/me", authorization, userController.getMe);
router.post("/find", authorization, adminOnly, userController.findUser);
router.post("/", registerValidation, userController.addUser);
router.put(
  "/:id",
  authorization,
  adminOnly,
  updateUserValidation,
  userController.updateUser,
);
router.delete("/:id", authorization, adminOnly, userController.deleteUser);

// Top Up
router.get(
  "/topup/",
  authorization,
  adminOnly,
  userController.getAllTopup,
);
router.post(
  "/topup/:username",
  authorization,
  topUpValidation,
  userController.topUpSaldo,
);
router.post(
  "/topup/a/:id",
  authorization,
  topUpValidation,
  adminOnly,
  userController.topUpSaldoAdmin,
);
router.put(
  "/topup/:id",
  authorization,
  adminOnly,
  userController.accTopup,
);
router.delete(
  "/topup/:id",
  authorization,
  adminOnly,
  userController.deleteTopup,
);

module.exports = router;
