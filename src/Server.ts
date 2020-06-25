import express from "express";
import bodyParser from "body-parser";
import { IConfig } from "./config/IConfig";
export default class Server {
  config: IConfig;
  app = express();

  constructor(config: IConfig) {
    this.config = config;
  }
  bootstrap() {
    this.setupRoutes();
    this.initBodyParser();
    return this;
  }

  setupRoutes() {
    console.log("Hello");
    this.app.get("/health-check", (req, res) => {
      res.send("I am OK");
      res.end();
    });
  }
  run() {
    this.app.listen(Number(this.config.port), () => {
      console.log("Ready");
    });
    return this;
  }

  initBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}
