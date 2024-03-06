const express = require(`express`);
const app = express();
app.use(express.json());
const userController = require(`../controller/userController`);
const { registerValidation } = require("../middlewares/validation");
const { adminOnly, authorization } = require("../middlewares/authValidation");

app.get("/", authorization, adminOnly, userController.getAllUser);
app.post("/find", authorization, adminOnly, userController.findUser);
app.post("/", registerValidation, userController.addUser);
app.put(
  "/:id",
  authorization,
  adminOnly,
  registerValidation,
  userController.updateUser
);
app.delete("/:id", authorization, adminOnly, userController.deleteUser);

module.exports = app;
