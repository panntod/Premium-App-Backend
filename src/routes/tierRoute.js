const express = require(`express`);
const app = express();
app.use(express.json());
const tierController = require(`../controller/tierController`);
// const { validateuser } = require("../middlewares/user-validation");
// const { authorize } = require("../controllers/auth.controller");
// const { IsUser, IsAdmin } = require("../middlewares/role-validation");

app.get("/", tierController.getAllTier);
app.get("/find/:key", tierController.findTier);
app.post("/", tierController.addTier);
app.put("/:id", tierController.updateTier);
app.delete("/:id", tierController.deleteTier);

module.exports = app;
