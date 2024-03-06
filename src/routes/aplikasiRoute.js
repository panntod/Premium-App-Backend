const express = require(`express`);
const app = express();
app.use(express.json());
const aplikasiController = require(`../controller/aplikasiController`);
// const { validateUser } = require("../middlewares/user-validation");
// const { authorize } = require("../controllers/auth.controller");
// const { IsUser, IsAdmin } = require("../middlewares/role-validation");

app.get("/", aplikasiController.getAllApp);
// app.get("/find", userController.findUser);
app.post("/", aplikasiController.addAplikasi);
// app.put("/:id", userController.updateUser);
// app.delete("/:id", userController.deleteUser);

module.exports = app;
