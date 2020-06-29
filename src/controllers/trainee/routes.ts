import express from "express";
import { middleware } from "../../libs/middleware";
import { schemas } from "./validate";
const router = express.Router();
router.get("/", middleware(schemas.get), (req, res) => {
  res.send("GET Route");
  res.end();
});

router.post("/", middleware(schemas.post), (req, res) => {
  res.send("POST Route");
  res.end();
});
router.put("/", middleware(schemas.put), (req, res) => {
  res.send("PUT Route");
  res.end();
});

router.delete("/", middleware(schemas.delete), (req, res) => {
  res.send("DELETE Route");
  res.end();
});

export default router;
