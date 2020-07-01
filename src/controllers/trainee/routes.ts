import express from "express";
import { authMiddleWare } from "../../libs/routes/authMiddleWare";
import { moduleName, permissionTypes } from "../../utils/constants";
import { middleware } from "../../libs/middleware";
import { schemas } from "./validate";
const router = express.Router();
router.get(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.get),
  (req, res) => {
    res.send("GET Route");
    res.end();
  }
);

router.post(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.post),
  (req, res) => {
    res.send("POST Route");
    res.end();
  }
);
router.put(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.put),
  (req, res) => {
    res.send("PUT Route");
    res.end();
  }
);

router.delete(
  "/",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.delete),
  (req, res) => {
    res.send("DELETE Route");
    res.end();
  }
);

export default router;
