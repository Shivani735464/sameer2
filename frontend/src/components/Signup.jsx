import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HelpCircle } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df",
];

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    colonyName: "",
    streetName: "",
    houseNumber: "",
    city: "",
    nearbyLandmark: "",
    profilePic: null,
  });

  useEffect(() => {
    document.body.style.fontFamily = "'Rajdhani', sans-serif";
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") setForm({ ...form, profilePic: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/signup`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      login(data);
      navigate("/hero");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-white to-gray-100 text-white overflow-hidden">
      {/* 🔹 Top 75% - Infinite Scroll Background with Form */}
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

        {/* 🔹 Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="absolute top-18 z-10 left-1/2 transform -translate-x-1/2 flex flex-col gap-3 w-11/12 max-w-sm
                     px-6 py-6 rounded-2xl bg-white/30 backdrop-blur-md border border-gray-300
                     max-h-[85%] overflow-y-auto scrollbar-none"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}
        >
          <style>
            {`
              form::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
            required
          />
          <input
            name="email"
            placeholder="Email (optional)"
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
          />
          <input
            name="colonyName"
            placeholder="Colony"
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
          />
          <input
            name="streetName"
            placeholder="Street"
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
          />
          <input
            name="houseNumber"
            placeholder="House Number"
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
          />
          <input
            name="nearbyLandmark"
            placeholder="Nearby Landmark"
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 text-center text-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
          />
          <input
            type="file"
            name="profilePic"
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-3 file:py-1 file:px-3 file:border-0 file:rounded file:bg-blue-600 file:text-white cursor-pointer font-[Rajdhani]"
          />
        </form>
      </div>
<button
          onClick={() => alert("Contact support at support@example.com")}
          className="absolute z-10 top-5 right-5 flex items-center gap-2 bg-white backdrop-blur-md border border-gray-300 px-4 py-1 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all font-[Rajdhani]"
        >
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span className="text-gray-800 font-semibold text-sm sm:text-base">
            Help
          </span>
        </button>
      {/* 🔹 Bottom 25% - Card Section */}
      <div className="h-[25%] flex justify-center items-center p-3 bg-white">
        <div className="relative flex flex-row sm:flex-row items-center justify-between p-4 sm:p-6 w-[95%] sm:w-[85%] md:w-[70%] transition-all duration-300">
          {/* Left Side */}
          <div className="flex-1 flex flex-col justify-center text-center sm:text-left gap-1 font-[Rajdhani]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Create your free Account
            </h2>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all font-semibold"
            >
              Register
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1 flex justify-center sm:justify-end">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="signup"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Infinite Scroll Animation */}
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

export default Signup;