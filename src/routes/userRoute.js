const express = require(`express`);
const app = express();
app.use(express.json());
const userController = require(`../controller/userController`);
const {
  registerValidation,
  resetPasswordValidation,
} = require("../middlewares/userValidation");
const { adminOnly, authorization } = require("../middlewares/authValidation");

app.get("/", authorization, adminOnly, userController.getAllUser);
app.post("/find", authorization, userController.findUser);
app.post("/", registerValidation, userController.addUser);
app.put("/:id", authorization, adminOnly, registerValidation, userController.updateUser);
app.patch("/", resetPasswordValidation, userController.resetPassword);
app.delete("/:id", authorization, adminOnly, userController.deleteUser);

module.exports = app;
