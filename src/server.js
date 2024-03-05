const express = require(`express`);

const app = express();

const PORT = 8000;

const cors = require(`cors`);

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server of Ticket Sales runs on port ${PORT}`);
});
