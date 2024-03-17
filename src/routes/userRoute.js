const express = require(`express`);
const router = express.Router();
const userController = require(`../controller/userController`);
const {
  registerValidation,
  topUpValidation,
  updateUserValidation,
} = require("../middlewares/validation");
const { adminOnly, authorization } = require("../middlewares/authValidation");

router.get("/", authorization, adminOnly, userController.getAllUser);

router.post("/me", authorization, userController.getMe);

router.post("/find", authorization, adminOnly, userController.findUser);

router.post("/", registerValidation, userController.addUser);

router.post(
  "/topUp/:username",
  authorization,
  topUpValidation,
  userController.topUpSaldo,
);

router.put(
  "/:id",
  authorization,
  adminOnly,
  updateUserValidation,
  userController.updateUser,
);
router.delete("/:id", authorization, adminOnly, userController.deleteUser);

module.exports = router;
