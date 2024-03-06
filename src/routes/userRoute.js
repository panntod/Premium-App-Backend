const express = require(`express`);
const app = express();
app.use(express.json());
const userController = require(`../controller/userController`);
// const { validateUser } = require("../middlewares/user-validation");
// const { authorize } = require("../controllers/auth.controller");
// const { IsUser, IsAdmin } = require("../middlewares/role-validation");

app.get("/", userController.getAllUser);
app.post("/find", userController.findUser);
app.post("/", userController.addUser);
app.put("/:id", userController.updateUser);
// app.patch("/", userController.updatePass);
app.delete("/:id", userController.deleteUser);

module.exports = app;
