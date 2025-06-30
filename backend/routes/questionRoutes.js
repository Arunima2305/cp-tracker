import express from "express";
import Question from "../models/Question.js";
import  authMiddleware from "../middleware/authMiddleware.js"; // ✅ uncomment this

const router = express.Router();

// ✅ Add middleware here
router.get("/", authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching questions" });
  }
});

//to add a new question

router.post("/", authMiddleware, async (req, res) => {
  const { title, url, notes = "", tags = "", difficulty = "", status = false, revisit = false } = req.body;

  try {
    const newQuestion = new Question({
      title,
      url,
      notes,
      tags,
      difficulty,
      status,
      revisit,
      user: req.user._id,
    });

    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to save question", error });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update question", error });
  }
});

export default router;
