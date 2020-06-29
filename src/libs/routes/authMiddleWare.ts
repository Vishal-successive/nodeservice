import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const config = dotenv.config();
const { AUTH_KEY } = config.parsed;
export const authMiddleWare = (module, permissionType) => {
  return (req, res, next) => {
    const token = req.headers.Authorization;
    if (!token) return res.status(403).json({ error: "Token not found" });
    console.log(`Auth Key = ${AUTH_KEY} and token = ${token}`);
    jwt.verify(token, AUTH_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ error: "Unauthorized Access" });
      }
      console.log(decoded);
      next();
    });
  };
};
