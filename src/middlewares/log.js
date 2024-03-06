const chalk = require("chalk")

const customLog = (action, data, error) => {
  let color;

  switch (action.toLowerCase()) {
    case "create":
      color = chalk.green;
      break;
    case "update":
      color = chalk.yellow;
      break;
    case "delete":
      color = chalk.red;
      break;
    case "read":
      color = chalk.blue;
      break;
    case "change":
      color = chalk.gray;
      break;
    default:
      color = chalk.white;
      action = "unknown";
  }

  console.log(`[${color(action.toUpperCase())}] ${JSON.stringify(data)}`);
};

const logMiddleware = (req, res, next) => {
  const { method, originalUrl, body } = req;

  switch (method) {
    case "GET":
      customLog("read", { endpoint: originalUrl });
      break;
    case "POST":
      customLog("create", { endpoint: originalUrl, data: body });
      break;
    case "PUT":
      customLog("update", { endpoint: originalUrl });
      break;
    case "PATCH":
      customLog("change", { endpoint: originalUrl });
      break;
    case "DELETE":
      customLog("delete", { endpoint: originalUrl });
      break;
    default:
      customLog("unknown", { endpoint: originalUrl });
  }

  next();
};

module.exports = {
  logMiddleware,
};
