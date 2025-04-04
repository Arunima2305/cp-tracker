import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";  
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Upcoming from "./pages/Upcoming"; // Import the Upcoming component

export default function App() {
  return (
    <div>
      <Header/> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upcoming" element={<Upcoming />} /> 
        <Route path="/practice" element={<Upcoming />} />
        <Route path="/contests" element={<Upcoming />} />
        <Route path="/resources" element={<Upcoming />} />
        <Route path="/group" element={<Upcoming />} />
        <Route path="/discuss" element={<Upcoming />} />
        <Route path="/features" element={<Upcoming />} />
        <Route path="/faq" element={<Upcoming />} />
        <Route path="/terms" element={<Upcoming />} />
      </Routes>
      <Footer/>
    </div>
  );
}
