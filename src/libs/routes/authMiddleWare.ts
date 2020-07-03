import jwt from "jsonwebtoken";
import { hasPermission } from "../../utils/permission";
import { readUserById } from "../../repositories/user/UserRepository";
import dotenv from "dotenv";
const config = dotenv.config();
const { AUTH_KEY } = config.parsed;
export const authMiddleWare = (module, permissionType) => {
  return (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, AUTH_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            result: false,
            message: "Token invalid",
          });
        } else if (decoded.role) {
          console.log("User = ", decoded);
          const permission = hasPermission(
            module,
            decoded.role,
            permissionType
          );
          if (permission === false) {
            return res
              .status(403)
              .json({ result: false, message: "Unauthorized User" });
          }
          const user = await readUserById(decoded.id);
          req.body.data = user;
          console.log("Calling next middleware...");
          next();
        } else {
          console.log("Auth Validated, Calling next middleware...");
          next();
        }
      });
    } else {
      res.status(400).json({
        result: false,
        message: "Token missing",
      });
    }
  };
};
