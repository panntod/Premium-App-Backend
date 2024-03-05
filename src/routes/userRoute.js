const express = require(`express`);
const app = express();
app.use(express.json());
const userController = require(`../controller/userController`);
// const { validateUser } = require("../middlewares/user-validation");
// const { authorize } = require("../controllers/auth.controller");
// const { IsUser, IsAdmin } = require("../middlewares/role-validation");

app.get("/", userController.getAllUser);
// app.get("/:key", authorize, IsAdmin, userController.findUser);
app.post("/", userController.addUser);
// app.put("/:id", authorize, IsUser, validateUser, userController.updateUser);
// app.patch("/", userController.updatePass);
// app.put("/adminReset/:id", userController.updatePassAdmin);
// app.delete("/:id", authorize, IsAdmin, userController.deleteUser);

module.exports = app;
