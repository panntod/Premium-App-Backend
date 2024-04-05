import express, { Router } from "express";
import * as AplikasiController from "../controller/aplikasiController";
import { authorization, adminOnly } from "../middlewares/authValidation";

const router: Router = express.Router();

router.get("/", authorization, adminOnly, AplikasiController.getAllAplikasi);

router.post("/find", authorization, AplikasiController.findAplikasi);

router.post("/",AplikasiController.addAplikasi);

router.put(
  "/:id",
  authorization,
  adminOnly,
  AplikasiController.updateAplikasi
);

// router.delete("/:id", authorization, adminOnly, AplikasiController.deleteUser);

export default router;