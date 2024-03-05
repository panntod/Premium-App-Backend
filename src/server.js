const bodyParser = require("body-parser");
const express = require(`express`);
const cors = require(`cors`);
const app = express();
const { PORT, allowedOrigins } = require("./helpers/Config");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

const indexRoute = require("./routes/index");
app.use(indexRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server of cafe runs on port ${PORT}`);
});
