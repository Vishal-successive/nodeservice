import express from "express";
import { authMiddleWare } from "../../libs/routes/authMiddleWare";
import { moduleName, permissionTypes } from "../../utils/constants";
import { readUser } from "../../repositories/user/UserRepository";
const userRouter = express.Router();
userRouter.get(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  (req, res) => {
    res.send("GET Route");
    res.end();
  }
);

userRouter.post(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  (req, res) => {
    res.send("POST Route");
    res.end();
  }
);
userRouter.put(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  (req, res) => {
    res.send("PUT Route");
    res.end();
  }
);

userRouter.delete(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  (req, res) => {
    res.send("DELETE Route");
    res.end();
  }
);

export default userRouter;
