import chalk, { Chalk } from "chalk";
import { Request, Response, NextFunction } from "express";

const customLog = (action: string, data: any, error?: Error) => {
  let color: Chalk;

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

  if (error) {
    console.error(chalk.red(`[ERROR] ${error.message}`));
  }
};

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl, body } = req;

  try {
    switch (method) {
      case "GET":
        customLog("read", { endpoint: originalUrl });
        break;
      case "POST":
        customLog("create", { endpoint: originalUrl, data: body });
        break;
      case "PUT":
        customLog("update", { endpoint: originalUrl, data: body });
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
  } catch (error: any) {
    customLog("error", { endpoint: originalUrl }, error);
  }

  next();
};

export { logMiddleware };
