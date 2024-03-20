import express from "express";
import userRoute from "./userRoute";
import { logMiddleware } from "../middlewares/log";
import { authentication, authorization } from "../middlewares/authValidation";

const app = express();

app.use(logMiddleware);
app.use(express.json());

app.use("/user", userRoute);
app.use("/login", authentication);
app.use("/autho", authorization);

export default app;
