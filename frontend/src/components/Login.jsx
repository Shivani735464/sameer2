import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HelpCircle } from "lucide-react";
import { useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df",
];

const Login = () => {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.body.style.fontFamily = "'Rajdhani', sans-serif";
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        form
      );
      login(data);
      navigate("/hero");
    } catch (err) {
      setError("Invalid name or phone number");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-white to-gray-100 text-gray-900 overflow-hidden">
      {/* 🔹 Top 75% - Infinite Scroll Background with Inputs */}
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

        {/* 🔹 Input Fields */}
        <div className="absolute z-10 top-[13%] left-1/2 -translate-x-1/2 w-11/12 max-w-sm flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="p-3 rounded border border-gray-300 text-center text-gray-100 bg-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-100 font-[Rajdhani]"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            className="p-3 rounded border border-gray-300 text-center text-gray-900 bg-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-100 font-[Rajdhani]"
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        {/* 🔹 Help Button */}
        <button
          onClick={() => alert("Contact support at support@example.com")}
          className="absolute z-10 top-5 right-5 flex items-center gap-2 bg-white backdrop-blur-md border border-gray-300 px-4 py-1 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all font-[Rajdhani]"
        >
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span className="text-gray-800 font-semibold text-sm sm:text-base">
            Help
          </span>
        </button>
      </div>

      {/* 🔹 Bottom 25% - Terms & Login Section */}
      <div className="h-[25%] flex justify-center items-center p-3 bg-white">
        <div className="relative flex flex-row sm:flex-row items-center justify-between p-4 sm:p-6 w-[95%] sm:w-[85%] md:w-[70%] transition-all duration-300">
          {/* Left Section */}
          <div className="flex-1 flex flex-col justify-center text-center sm:text-left gap-2 font-[Rajdhani]">
            <p className="text-gray-700 text-sm md:text-base">
              By logging in, you agree to our{" "}
              <span className="underline cursor-pointer text-blue-700 hover:text-blue-800">
                Terms & Conditions
              </span>.
            </p>
            <button
              onClick={handleSubmit}
              className="w-fit mx-auto sm:mx-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Login
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="flex-1 flex justify-center sm:justify-end">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="login"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Infinite Scroll Animation Style */}
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

export default Login;