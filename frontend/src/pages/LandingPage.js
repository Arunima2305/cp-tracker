import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <div className="flex flex-col bg-white">
      

      {/* Hero Section */}
      <section className="flex justify-between items-center px-20 py-16 bg-[#C3AA94]">
        {/* Text Content */}
        <div className="max-w-xl text-white">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            The Art <br /> of Coding
          </h1>
          <p className="text-lg font-semibold mb-6">
            Tired of getting TLE? Let’s turn it into AC — one problem at a time.
            It’s not just another question bank,this is your personal CP dashboard.
          </p>
          <div className="flex gap-4">
            <Link to="/practice" className="bg-[#FAD5A2] text-[#534E4A] font-bold px-8 py-4 rounded-md hover:brightness-110 transition">
              Start Solving
            </Link>
            <Link to="/features" className="border border-[#534E4A] text-[#534E4A] font-bold px-8 py-4 rounded-md hover:bg-[#534E4A] hover:text-white transition">
              View Features
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <img
          src="https://storage.googleapis.com/tagjs-prod.appspot.com/7QVBGMu6GA/9et8eeqm.png"
          alt="Hero Visual"
          className="w-[422px] h-[748px] object-contain"
        />
      </section>
    </div>
  );
}
