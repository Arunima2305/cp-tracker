import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  notes: { type: String, default: "" },
  tags: { type: String, default: "" },
  difficulty: { type: String, default: "" },
  status: { type: Boolean, default: false },
  revisit: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);
export default Question;
