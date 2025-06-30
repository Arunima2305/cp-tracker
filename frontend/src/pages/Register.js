import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/pic.png";
import { useState } from "react";

import axios from "../utils/axios.js"; // Ensure this path is correct";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("api/auth/register", form);
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side – Registration Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#F5F1EC] px-10 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#534E4A] mb-6">Create Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAD5A2]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAD5A2]"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAD5A2]"
              required
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#534E4A] text-white font-semibold py-3 rounded-md hover:bg-[#3e3a36] transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-[#534E4A]">
            Already registered?{" "}
            <Link to="/login" className="text-[#FAD5A2] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right side – Image */}
      <div className="hidden lg:flex flex-1 bg-[#c3aa94] items-center justify-center">
       
      </div>
    </div>
  );
}
