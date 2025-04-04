import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/cp.png";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login page after logout
  };

  return (
    <header className="bg-[#534E4A] text-white shadow-md">
      <div className="relative max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-center">
        
        {/* Left Nav */}
        <div className="flex gap-14 text-sm font-semibold absolute left-12">
          <Link to="/practice" className="hover:text-[#FAD5A2] transition-colors">PRACTICE</Link>
          <Link to="/contests" className="hover:text-[#FAD5A2] transition-colors">CONTESTS</Link>
          <Link to="/resources" className="hover:text-[#FAD5A2] transition-colors">RESOURCES</Link>
          <Link to="/group" className="hover:text-[#FAD5A2] transition-colors">GROUP</Link>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center items-center">
          <img src={logo} alt="CP Logo" className="h-14 w-12 object-contain" />
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-10 text-sm font-semibold absolute right-10">
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
        </div>

      </div>
    </header>
  );
}
