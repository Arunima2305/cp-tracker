const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  notes: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to User
});

module.exports = mongoose.model("Question", QuestionSchema);
