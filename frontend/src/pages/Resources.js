import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa"; // For external link icon
import striver from "../assets/striver.png"; // Assuming you have a Striver logo
import cses from "../assets/cses.png"; // Assuming you have a CSES logo
import tle from "../assets/tle.png"; // Assuming you have a TLE Sheet logo

const resources = [
  {
    name: "TLE Sheet",
    desc: "A curated list of CP problems (Codeforces, AtCoder, LeetCode) by topic and difficulty.",
    url: "https://www.tle-eliminators.com/cp-sheet",
    color: "#D1E9FF",
    logo: tle,
  },
  {
    name: "Striver SDE Sheet",
    desc: "Striver’s famous 180 SDE Sheet: must-solve coding interview questions.",
    url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
    color: "#FFE8D1",
    logo: striver,
  },
  {
    name: "CSES Problem Set",
    desc: "A wide range of classic competitive programming problems, organized by topic.",
    url: "https://cses.fi/problemset/",
    color: "#FEE8F1",
    logo: cses,
  },
];

export default function Resources() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-[#ebe6e2] px-8 py-12 flex flex-col items-center"
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-10 text-[#534E4A] tracking-tight"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        📚 Resources
      </motion.h1>
      <div className="grid gap-8 md:grid-cols-3 grid-cols-1 w-full max-w-6xl">
        {resources.map((r, idx) => (
          <motion.a
  key={r.name}
  href={r.url}
  target="_blank"
  rel="noopener noreferrer"
  className="block"
  initial={{ opacity: 0, y: 20, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
  whileHover={{ scale: 1.04, boxShadow: "0 4px 36px 0 rgba(80,80,80,0.12)" }}
  whileTap={{ scale: 0.97 }}
  style={{
    background: r.color,
    borderRadius: "1.5rem",
    padding: "2.5rem 2rem",
    boxShadow: "0 2px 14px 0 rgba(120,110,90,0.07)",
    textDecoration: "none",
    minHeight: 300,
    minWidth: 260,
    maxWidth: 350,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "box-shadow 0.2s",
    border: "2px solid #e5e0d9",
  }}
>
  <div
    style={{
      width: 96,
      height: 96,
      background: "#fff",
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      boxShadow: "0 1px 8px 0 rgba(80,80,80,0.06)",
      overflow: "hidden",
    }}
  >
    <img
      src={r.logo}
      alt={r.name + " logo"}
      style={{
        maxWidth: "88%",
        maxHeight: "88%",
        objectFit: "contain",
        display: "block",
      }}
    />
  </div>
  <div className="text-2xl font-semibold text-[#534E4A] mb-2 flex items-center gap-2">
    {r.name}
    <FaExternalLinkAlt size={16} className="text-[#a5897d]" />
  </div>
  <p className="text-[#67605b] text-base font-medium text-center">{r.desc}</p>
</motion.a>
        ))}
      </div>
    </motion.div>
  );
}
