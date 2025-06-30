import { Link } from "react-router-dom";
import illus from "../assets/illus.png";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <motion.div
      className="flex flex-col bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Hero Section */}
      <motion.section
        className="flex justify-between items-center px-20 py-16 bg-[#C3AA94]"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
      >
        {/* Text Content */}
        <motion.div
          className="max-w-xl text-white"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.3 }}
        >
          <motion.h1
            className="text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            The Art <br /> of Coding
          </motion.h1>
          <motion.p
            className="text-lg font-semibold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Tired of getting TLE? Let’s turn it into AC — one problem at a time.
            It’s not just another question bank,this is your personal CP dashboard.
          </motion.p>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/practice"
                className="bg-[#FAD5A2] text-[#534E4A] font-bold px-8 py-4 rounded-md hover:brightness-110 transition"
              >
                Start Solving
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/features"
                className="border border-[#534E4A] text-[#534E4A] font-bold px-8 py-4 rounded-md hover:bg-[#534E4A] hover:text-white transition"
              >
                View Features
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.img
          src={illus}
          alt="Hero Visual"
          className="w-[422px] h-[500px] object-contain"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 60 }}
          whileHover={{ scale: 1.02 }}
        />
      </motion.section>
    </motion.div>
  );
}
