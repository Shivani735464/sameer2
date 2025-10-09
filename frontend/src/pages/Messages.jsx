import { HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Messages = () => {
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
       <button
          onClick={() => alert("Contact support at support@example.com")}
          className="fixed z-10 top-5 right-4 flex items-center gap-2 bg-white backdrop-blur-md px-1 py-1 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all font-[Rajdhani]"
        >
          <HelpCircle className="w-5 h-5 text-gray-700" />
          {/* <span className="text-gray-800 font-semibold text-sm sm:text-base">
            Help
          </span> */}
        </button>


      <h1>message coming soon</h1>
    </div>
  );
};

export default Messages;
