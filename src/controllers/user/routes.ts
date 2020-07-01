import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleWare } from "../../libs/routes/authMiddleWare";
import { moduleName, permissionTypes } from "../../utils/constants";
import { userSchemas } from "./validationSchema";
import { middleware } from "../../libs/validationMiddleware";
import dotenv from "dotenv";
const config = dotenv.config();
const { password } = config.parsed;
const userRouter = express.Router();
userRouter.get(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(userSchemas.get),
  (req, res) => {
    res.status(200).json(req.body.data);
    res.end();
  }
);

userRouter.post(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(userSchemas.post),
  (req, res) => {
    res.send("POST Route");
    res.end();
  }
);
userRouter.put(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(userSchemas.put),
  (req, res) => {
    res.send("PUT Route");
    res.end();
  }
);

userRouter.delete(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(userSchemas.delete),
  (req, res) => {
    res.send("DELETE Route");
    res.end();
  }
);

userRouter.post("/login", middleware(userSchemas.post), async (req, res) => {
  console.log("/login route");
  const { email, id } = req.body;
  await jwt.sign({ email, id }, password, { expiresIn: 900 }, (err, token) => {
    if (err) {
      console.log(err.message);
      res.status(404).json({ error: err.message });
    }
    console.log("Token = ", token);
    res.send(token);
    res.end();
  });
});

export default userRouter;
