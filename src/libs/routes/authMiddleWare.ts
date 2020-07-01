import jwt from "jsonwebtoken";
import { hasPermission } from "../../utils/permission";
import dotenv from "dotenv";
const config = dotenv.config();
const { AUTH_KEY } = config.parsed;
export const authMiddleWare = (module, permissionType) => {
  return (req, res, next) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) return res.status(403).json({ error: "Token not found" });
    jwt.verify(token, AUTH_KEY, (err, decoded) => {
      if (err) {
        console.log(err.message);
        return res.status(403).json({ error: "Unauthorized Access" });
      }
      console.log("User = ", decoded);
      const permission = hasPermission(module, decoded.role, permissionType);
      if (permission === false) {
        return res.status(403).json({ error: "Unauthorized User" });
      }
      console.log("Calling next middleware...");
      next();
    });
  };
};
