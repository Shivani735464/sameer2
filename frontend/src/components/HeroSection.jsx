import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCrown, FaBell, FaTools, FaMicrophoneAlt } from "react-icons/fa";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  // 👇 Image slider
  const images = [
    "https://cdn.pixabay.com/photo/2021/12/18/06/02/bathroom-6878035_640.jpg",
    "https://cdn.pixabay.com/photo/2016/11/30/08/48/bedroom-1872196_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/02/17/09/36/painter-4856002_640.jpg",
    "https://cdn.pixabay.com/photo/2016/09/26/19/07/electrician-1696757_640.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-center flex flex-col items-center overflow-y-auto pb-10">
      {/* 🔹 Image Slider Section */}
      <div className="relative w-full h-[70vh] overflow-hidden rounded-b-3xl shadow-md">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentImage ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* 🔹 Subscription Section */}
      <div className="bg-white w-[90%] mt-6 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-3 mb-3">
          <FaCrown className="text-yellow-500 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Exclusive Offer</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Get <span className="font-semibold text-green-600">30% OFF</span> on our{" "}
          <span className="text-yellow-600 font-semibold">Premium Subscription</span>.
          Make your work easier and faster — grab it now!
        </p>
        <button
          onClick={() => navigate("/subscription")}
          className="bg-yellow-400 text-white font-semibold px-8 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          Buy Now
        </button>
      </div>

      {/* 🔹 Notification Section */}
      <div className="bg-white w-[90%] mt-6 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-3 mb-3">
          <FaBell className="text-blue-500 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Stay Updated</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          You will receive all the latest updates, alerts, and announcements
          related to your work and subscription directly in your notification section.
        </p>
         <button
          onClick={() => navigate("/subscription")}
          className="bg-blue-400 text-white font-semibold px-8 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          Buy Now
        </button>
      </div>

      {/* 🔹 Problem Section */}
      <div className="bg-white w-[90%] mt-6 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-3 mb-3">
          <FaTools className="text-green-500 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Problem Solving</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          You can easily find and solve your work-related issues through our
          smart problem section. Get instant help when you need it.
        </p>
         <button
          onClick={() => navigate("/subscription")}
          className="bg-green-400 text-white font-semibold px-8 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          Buy Now
        </button>
      </div>

      {/* 🔹 Video Section */}
      <div className="bg-white w-[90%] mt-6 p-5 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Watch How It Works</h2>
        <video
          src="https://cdn.pixabay.com/vimeo/123456.mp4"
          controls
          className="rounded-xl shadow-md w-full"
        ></video>
      </div>

      {/* 🔹 AI Voice Command Section */}
      <div className="bg-white w-[90%] mt-6 p-5 rounded-2xl shadow-lg mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <FaMicrophoneAlt className="text-purple-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">AI Voice Commands</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Use your voice to control the app and solve tasks quickly.
          Just say what you need, and our AI assistant will take care of it!
        </p>
         <button
          onClick={() => navigate("/subscription")}
          className="bg-purple-500 text-white font-semibold px-8 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;