import express from "express";
import bodyParser from "body-parser";
import { IConfig } from "./config/IConfig";
import { router, userRouter } from "./router";
import dotenv from "dotenv";
const { parsed } = dotenv.config();
const { MONGO_URL } = parsed;
import Database from "./libs/Database";
const db = new Database();
export default class Server {
  config: IConfig;
  app = express();

  constructor(config: IConfig) {
    this.config = config;
  }
  bootstrap() {
    this.initBodyParser();
    this.app.use(bodyParser.json());
    this.setupRoutes();
    return this;
  }

  setupRoutes() {
    this.app.get("/health-check", (req, res) => {
      res.send("I am OK");
      res.end();
    });
    // this.app.use("/api", router);
    this.app.use("/api", userRouter);
  }
  run() {
    db.open(MONGO_URL);
    this.app.listen(Number(this.config.port), () => {
      console.log("Success");
    });
    return this;
  }

  initBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}
