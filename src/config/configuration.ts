import dotenv from "dotenv";
import get from "lodash/get";
import { IConfig } from "./IConfig";
const config = dotenv.config();
const envConfig = {
  port: get(config.parsed, "PORT"),
  env: get(config.parsed, "NODE_ENV"),
};
export default Object.freeze(envConfig as IConfig);
