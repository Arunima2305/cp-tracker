const express = require("express");
const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new question
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, url, topic, difficulty, notes } = req.body;
    const question = new Question({ title, url, topic, difficulty, notes, userId: req.user.id });
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all saved questions for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user.id });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a question
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { notes } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) return res.status(404).json({ message: "Question not found" });
    if (question.userId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    question.notes = notes;
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a question
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) return res.status(404).json({ message: "Question not found" });
    if (question.userId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    await question.remove();
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
