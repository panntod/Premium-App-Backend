import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import chalk from "chalk";
import { Config } from "./helpers/Config";
import indexRoute from "./routes/index";
import path from "path";

const app = express();
const publicPath = path.join(__dirname);

app.use(
  cors({
    origin: Config.allowedOrigins,
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(publicPath)); 

app.use(indexRoute);

app.listen(Config.PORT, () => {
  console.log(
    `[${chalk.blue("INFO")}] Premium apps server is running on port 8000 🚀`
  );
});
