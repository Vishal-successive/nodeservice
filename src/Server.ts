import express from "express";
export class server {
  config: string;

  constructor(config: string) {
    this.config = config;
  }

  bootstrap() {
    this.setupRoutes();
    return this;
  }

  setupRoutes() {
    let router = express.Router();
    router.get("/health-check", function (req, res) {
      res.send("I am OK");
    });
  }
  run() {
    const app = express();
    app.listen(3000, function () {
      console.log("Ready");
    });
  }
}
