import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import questionRoutes from "./routes/questionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
//import { protect } from "./middleware/authMiddleware.js";
import cors from "cors";

import parseQuestionRoutes from "./routes/questionParseRoutes.js";



dotenv.config();
connectDB();

const app = express();


const allowedOrigins = [
  "https://cp-tracker-vqyy.onrender.com", // Your frontend deployed domain
  "http://localhost:3000",                // For local development, if needed
  // add more origins if needed
];

app.use(cors({
  origin: (incomingOrigin, callback) => {
    // allow requests w/o origin (e.g. curl) or from any extension/website
    callback(null, true);
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/parse-question", parseQuestionRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
