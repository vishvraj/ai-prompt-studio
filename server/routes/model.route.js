import express from "express";
import { aiModels } from "../config/models.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(aiModels);
});

export default router;
