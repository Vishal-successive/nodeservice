import dotenv from "dotenv";
import get from "lodash/get";
import { IConfig } from "./IConfig";
const config = dotenv.config();
console.log(config);
const envConfig = {
  port: get(config.parsed, "PORT"),
  env: get(config.parsed, "NODE_ENV"),
};
console.log(envConfig);
export default Object.freeze(envConfig as IConfig);
