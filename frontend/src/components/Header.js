import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/cp.png";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  // Closes menu when a link is clicked (mobile)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="bg-[#534E4A] text-white shadow-md w-full z-50">
      <div className="relative max-w-screen-xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden absolute left-4 top-1/2 -translate-y-1/2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close Menu" : "Open Menu"}
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen ? (
              // X icon when menu is open
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger icon
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        {/* Center Logo */}
        <div className="flex flex-1 justify-center items-center z-50 pointer-events-none select-none">
          <img src={logo} alt="CP Logo" className="h-14 w-12 object-contain" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex w-full absolute left-0 top-0 h-full items-center justify-between px-10">
          {/* Left Nav */}
          <nav className="flex gap-14 text-sm font-semibold">
            <Link to="/practice" className="hover:text-[#FAD5A2] transition-colors">PRACTICE</Link>
            <Link to="/contests" className="hover:text-[#FAD5A2] transition-colors">CONTESTS</Link>
            <Link to="/resources" className="hover:text-[#FAD5A2] transition-colors">RESOURCES</Link>
            <Link to="/group" className="hover:text-[#FAD5A2] transition-colors">GROUP</Link>
          </nav>
          {/* Right Nav */}
          <nav className="flex items-center gap-10 text-sm font-semibold">
            <Link to="/discuss" className="hover:text-[#FAD5A2] transition-colors">DISCUSS</Link>
            <Link to="/features" className="hover:text-[#FAD5A2] transition-colors">FEATURES</Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#534E4A] transition">
                  DASHBOARD
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#534E4A] transition"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#534E4A] transition">
                  SIGN UP
                </Link>
                <Link to="/login" className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#534E4A] transition">
                  LOGIN
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Navigation Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-[#534E4A] bg-opacity-95 z-40 flex flex-col items-center pt-20 text-lg font-semibold space-y-7 md:hidden transition-all">
            {/* Close Button (inside menu) */}
            <button
              className="absolute top-6 right-8 text-3xl font-bold text-[#FAD5A2] hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Close Menu"
            >
              &times;
            </button>
            {/* Left Nav */}
            <Link to="/practice" onClick={handleNavClick} className="hover:text-[#FAD5A2] transition-colors">PRACTICE</Link>
            <Link to="/contests" onClick={handleNavClick} className="hover:text-[#FAD5A2] transition-colors">CONTESTS</Link>
            <Link to="/resources" onClick={handleNavClick} className="hover:text-[#FAD5A2] transition-colors">RESOURCES</Link>
            <Link to="/group" onClick={handleNavClick} className="hover:text-[#FAD5A2] transition-colors">GROUP</Link>
            {/* Right Nav */}
            <Link to="/discuss" onClick={handleNavClick} className="hover:text-[#FAD5A2] transition-colors">DISCUSS</Link>
            <Link to="/features" onClick={handleNavClick} className="hover:text-[#FAD5A2] transition-colors">FEATURES</Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" onClick={handleNavClick} className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#534E4A] transition w-36 text-center">
                  DASHBOARD
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#534E4A] transition w-36 text-center"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link to="/register" onClick={handleNavClick} className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#534E4A] transition w-36 text-center">
                  SIGN UP
                </Link>
                <Link to="/login" onClick={handleNavClick} className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#534E4A] transition w-36 text-center">
                  LOGIN
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
