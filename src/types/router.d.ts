import { RequestHandler } from "express";

declare module "./routes/index" {
  const app: {
    use: (middleware: RequestHandler) => void;
    get: (path: string, handler: RequestHandler) => void;
    post: (path: string, handler: RequestHandler) => void;
  };

  export = app;
}
