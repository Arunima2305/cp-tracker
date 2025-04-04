import express from "express";
import { getQuestionInfo } from "../utils/scrapeQuestionInfo.js";

const router = express.Router();

// @route GET /api/parse-question?url=<url>
router.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const info = await getQuestionInfo(url);
    res.json(info);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
