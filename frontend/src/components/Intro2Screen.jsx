import React, { useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Rajdhani font import (you can put this in index.html <head> also)
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const images = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df",
];

const Intro2Screen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily = "'Rajdhani', sans-serif";
  }, []);

  return (
 <div className="flex flex-col h-screen w-full bg-gradient-to-b from-white to-gray-100 text-gray-900 overflow-hidden">
      
      {/* 🔹 Top 75% - Infinite Slider */}
      <div className="relative h-[75%] w-full overflow-hidden">
        <div className="absolute top-0 left-0 flex w-[200%] h-full animate-scroll">
          {[...images, ...images].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`slide-${i}`}
              className="w-1/4 sm:w-1/5 h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* 🔹 Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="absolute bottom-[4%] left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600/70 to-blue-700/80 text-white border border-gray-300 px-8 py-2 rounded-full shadow-md hover:bg-blue-700 hover:text-white hover:scale-105 transition-all font-[Rajdhani] text-base sm:text-lg"
        >
          Login
        </button>

        {/* 🔹 Help Button */}
        <button
          onClick={() => alert("Contact support at support@example.com")}
          className="fixed z-10 top-5 right-4 flex items-center gap-2 bg-white backdrop-blur-md px-1 py-1 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all font-[Rajdhani]"
        >
          <HelpCircle className="w-5 h-5 text-gray-700" />
          {/* <span className="text-gray-800 font-semibold text-sm sm:text-base">
            Help
          </span> */}
        </button>
      </div>

      {/* 🔹 Bottom 25% - Signup Card */}
      <div className="h-[25%] flex justify-center items-center p-3 bg-white">
        <div className="relative flex flex-row sm:flex-row items-center justify-between p-3 sm:p-6 w-[95%] sm:w-[85%] md:w-[70%] transition-all duration-300">
          
          {/* Left Section */}
          <div className="flex-1 text-center sm:text-left mb-3 sm:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-[Rajdhani]">
              Welcome to <span className="text-blue-700">Labour App</span>
            </h2>
            {/* <p className="text-gray-600 mt-1 text-sm md:text-base font-[Rajdhani]">
              Start your journey with us.
            </p> */}
            <button
              onClick={() => navigate("/signup")}
              className="mt-1 bg-gradient-to-r from-green-600/60 to-emerald-500/70 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all font-[Rajdhani] text-[16px] sm:text-base"
            >
              Create Account
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="flex-1 flex justify-center sm:justify-end">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="welcome"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Smooth Infinite Scroll Keyframes */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Intro2Screen;