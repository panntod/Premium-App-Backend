const express = require(`express`);
const app = express();
app.use(express.json());

const tierController = require(`../controller/tierController`);
const { adminOnly, authorization} = require("../middlewares/authValidation")

app.get("/", tierController.getAllTier);
app.post("/find/:tierID", authorization, tierController.findTier);
app.post("/", authorization, adminOnly, tierController.addTier);
app.put("/:id", authorization, adminOnly, tierController.updateTier);
app.delete("/:id", authorization, adminOnly, tierController.deleteTier);

module.exports = app;
