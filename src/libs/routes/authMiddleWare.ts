import jwt from "jsonwebtoken";
import { hasPermission } from "../../utils/permission";
import { readUserById } from "../../repositories/user/UserRepository";
import dotenv from "dotenv";
const config = dotenv.config();
const { AUTH_KEY } = config.parsed;
export const authMiddleWare = (module, permissionType) => {
  return (req, res, next) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) return res.status(403).json({ error: "Token not found" });
    jwt.verify(token, AUTH_KEY, async (err, decoded) => {
      if (err) {
        console.log(err.message);
        return res.status(403).json({ error: "Unauthorized Access" });
      }
      console.log("User = ", decoded);
      // const permission = hasPermission(module, decoded.role, permissionType);
      // if (permission === false) {
      //   return res.status(403).json({ error: "Unauthorized User" });
      // }
      const user = await readUserById(decoded.id);
      if (!user) {
        return res.status(404).json({ error: "User Not Found in DB" });
      }
      req.body.data = user;
      console.log("Calling next middleware...");
      next();
    });
  };
};
