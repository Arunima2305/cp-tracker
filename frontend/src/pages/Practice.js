import { useState } from "react";
import { motion } from "framer-motion";

const CODEFORCES_TOPICS = [
  "dp", "math", "greedy", "implementation", "data structures", "brute force", "constructive algorithms",
  "graphs", "sortings", "binary search", "dfs and similar", "trees", "strings", "number theory",
  "combinatorics", "bitmasks", "two pointers"
];

const DIFFICULTIES = [
  { label: "Easy (800-1200)", min: 800, max: 1200 },
  { label: "Medium (1300-1700)", min: 1300, max: 1700 },
  { label: "Hard (1800+)", min: 1800, max: 3500 },
];

export default function Practice() {
  const [platform, setPlatform] = useState("codeforces");
  const [topic, setTopic] = useState(CODEFORCES_TOPICS[0]);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchRandomCFProblem() {
    setLoading(true);
    setQuestion(null);
    try {
      // Fetch all CF problems
      const resp = await fetch("https://codeforces.com/api/problemset.problems");
      const data = await resp.json();
      // Filter by topic/tag and difficulty range
      const pool = data.result.problems.filter(
        (q) =>
          q.tags.includes(topic) &&
          q.rating &&
          q.rating >= difficulty.min &&
          q.rating <= difficulty.max
      );
      // Pick a random one
      if (pool.length === 0) {
        setQuestion({ error: "No problems found for this tag/difficulty!" });
      } else {
        const random = pool[Math.floor(Math.random() * pool.length)];
        setQuestion(random);
      }
    } catch (e) {
      setQuestion({ error: "Failed to fetch problem. Try again!" });
    }
    setLoading(false);
  }

  // You could add more platforms and APIs later!

  return (
    <motion.div
      className="min-h-screen bg-[#ebe6e2] px-8 py-12 flex flex-col items-center"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-10 text-[#534E4A]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        🏋️ Practice
      </motion.h1>

      {/* Problem Picker Card */}
      <motion.div
        className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8 mb-12 flex flex-col gap-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Platform (only CF for now) */}
          <div className="flex-1">
            <label className="font-semibold text-[#534E4A]">Platform</label>
            <select
              className="block mt-1 rounded-lg border px-2 py-1 w-full"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              disabled
            >
              <option value="codeforces">Codeforces</option>
              {/* You can add LeetCode, AtCoder, etc. later! */}
            </select>
          </div>
          {/* Topic */}
          <div className="flex-1">
            <label className="font-semibold text-[#534E4A]">Topic</label>
            <select
              className="block mt-1 rounded-lg border px-2 py-1 w-full"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              {CODEFORCES_TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          {/* Difficulty */}
          <div className="flex-1">
            <label className="font-semibold text-[#534E4A]">Difficulty</label>
            <select
              className="block mt-1 rounded-lg border px-2 py-1 w-full"
              value={difficulty.label}
              onChange={(e) =>
                setDifficulty(DIFFICULTIES.find((d) => d.label === e.target.value))
              }
            >
              {DIFFICULTIES.map((d) => (
                <option key={d.label}>{d.label}</option>
              ))}
            </select>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
          className="w-full mt-2 py-2 rounded-lg font-bold bg-[#C3AA94] text-[#534E4A] shadow transition"
          onClick={fetchRandomCFProblem}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Random Problem"}
        </motion.button>
        {question && (
          <motion.div
            className="mt-6 p-5 bg-[#f8f6f2] rounded-xl text-center border"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {question.error ? (
              <span className="text-red-500 font-semibold">{question.error}</span>
            ) : (
              <>
                <a
                  href={`https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-[#534E4A] underline"
                >
                  {question.name}
                </a>
                <div className="mt-2 text-sm text-[#8b837b]">
                  Tags: {question.tags.join(", ")}
                  <br />
                  Difficulty: {question.rating}
                </div>
              </>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Upcoming Feature: AI Recommendations */}
      <motion.div
        className="w-full max-w-xl bg-[#F9D9D9] border-2 border-dashed border-[#cbaead] rounded-2xl p-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-2xl font-semibold text-[#534E4A] mb-2">
          🔮 Upcoming: AI Recommendation Engine
        </div>
        <p className="text-[#765b52] text-center text-base font-medium">
          Soon, you'll get personalized practice recommendations based on your progress, strengths, and weaknesses!
        </p>
      </motion.div>
    </motion.div>
  );
}
