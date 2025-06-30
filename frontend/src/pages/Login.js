import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios.js"; 
import logo from "../assets/pic.png"; // Update with your actual logo path


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      console.log(localStorage.getItem("token"));

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side – Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#F5F1EC] px-10 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#534E4A] mb-6">Login</h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAD5A2]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAD5A2]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#534E4A] text-white font-semibold py-3 rounded-md hover:bg-[#3e3a36] transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-[#534E4A]">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#FAD5A2] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right side – Illustration */}
      <div className="hidden lg:flex flex-1 bg-[#c3aa94] items-center justify-center">
       
      </div>
    </div>
  );
}
