import { create } from "../repositories/user/UserRepository";
export const initialData = () => {
  create({
    name: "Vishal",
    email: "vishal.kumar@successive.tech",
  });
};
