import { createUser } from "../repositories/user/UserRepository";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
const config = dotenv.config();
const { password } = config.parsed;
const saltRounds = 10;
export const initialData = async () => {
  const hash = await bcrypt.hash(password, saltRounds);
  createUser({
    name: "Vishal",
    email: "vishal.kumar@successive.tech",
    password: hash,
  });
};
