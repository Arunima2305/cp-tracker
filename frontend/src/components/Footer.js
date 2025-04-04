import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#534E4A] text-white">
      <div className="max-w-screen-xl mx-auto px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left: Logo & Branding */}
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">CodeFlow</span>
            <p className="text-sm text-[#d3d3d3] max-w-sm">
              One platform. All your coding goals.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex flex-col gap-2 text-sm font-medium">
            <Link to="/practice" className="hover:text-[#FAD5A2]">Practice</Link>
            <Link to="/contests" className="hover:text-[#FAD5A2]">Contests</Link>
            <Link to="/features" className="hover:text-[#FAD5A2]">Features</Link>
            <Link to="/discuss" className="hover:text-[#FAD5A2]">Discuss</Link>
          </div>

          {/* Right: Call-to-Actions or Links */}
          <div className="flex flex-col gap-2 text-sm font-medium">
            <Link to="/register" className="hover:text-[#FAD5A2]">Sign Up</Link>
            <Link to="/login" className="hover:text-[#FAD5A2]">Login</Link>
            <Link to="/faq" className="hover:text-[#FAD5A2]">FAQ</Link>
            <Link to="/terms" className="hover:text-[#FAD5A2]">Terms & Conditions</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/20 pt-4 text-xs text-center text-gray-300">
          © {new Date().getFullYear()} CodeFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
