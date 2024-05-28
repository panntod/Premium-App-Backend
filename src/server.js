const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require(`express`);
const cors = require(`cors`);
const app = express();
const chalk = require("chalk");
const { PORT, allowedOrigins } = require("./helpers/Config");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

const indexRoute = require("./routes/index");
app.use(indexRoute);

app.listen(PORT, () => {
  console.log(
    `${chalk.blue("[INFO]")} Server of premium apps runs on http://localhost:${PORT} 🚀`,
  );
});
