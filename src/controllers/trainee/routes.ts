import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("GET Route");
  res.end();
});

router.post("/", (req, res) => {
  res.send("POST Route");
  res.end();
});
router.put("/", (req, res) => {
  res.send("PUT Route");
  res.end();
});

router.delete("/", (req, res) => {
  res.send("DELETE Route");
  res.end();
});

export default router;
