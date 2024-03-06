const express = require(`express`);
const app = express();
app.use(express.json());
const userController = require(`../controller/userController`);
const { registerValidation, resetPasswordValidation } = require("../middlewares/userValidation");
// const { authorize } = require("../controllers/auth.controller");
// const { IsUser, IsAdmin } = require("../middlewares/role-validation");

app.get("/", userController.getAllUser);
app.post("/find", userController.findUser);
app.post("/", registerValidation, userController.addUser);
app.put("/:id", registerValidation, userController.updateUser);
app.patch("/", resetPasswordValidation, userController.resetPassword);
app.delete("/:id", userController.deleteUser);

module.exports = app;
