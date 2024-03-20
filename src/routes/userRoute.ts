import express, { Router } from "express";
import * as userController from "../controller/userController";
import { authorization, adminOnly } from "../middlewares/authValidation";
import {
  registerValidation,
  updateUserValidation,
} from "../middlewares/validation";

const router: Router = express.Router();

router.get("/", authorization, adminOnly, userController.getAllUser);

router.post("/me", authorization, userController.getMe);

router.post("/find", authorization, userController.findUser);

router.post("/", registerValidation, userController.addUser);

router.post("/topUp/:username", authorization, userController.topUpSaldo);

router.put(
  "/:id",
  authorization,
  adminOnly,
  updateUserValidation,
  userController.updateUser
);

router.delete("/:id", authorization, adminOnly, userController.deleteUser);

export default router;
