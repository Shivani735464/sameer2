import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { HelpCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // ✅ Import AuthContext

const plans = [
  { id: 1, name: "Basic", price: 400, labour: 10, comingCharge: 0 },
  { id: 2, name: "Standard", price: 800, labour: 20, comingCharge: 0 },
  { id: 3, name: "Premium", price: 1200, labour: 30, comingCharge: 0 },
];

const Subscription = () => {
  const { user } = useAuth(); // ✅ get logged in user
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [message, setMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

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

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setFormData({ name: "", phone: "" }); // reset form
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      setMessage("Please login to subscribe!");
      return;
    }

    try {
      const payload = {
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        price: selectedPlan.price,
        labour: selectedPlan.labour,
        comingCharge: selectedPlan.comingCharge,
        name: formData.name,
        phone: formData.phone,
        userId: user._id, // ✅ associate subscription with user
      };

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/subscriptions`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // ✅ pass token
          },
        }
      );

      setMessage(`Subscribed to ${selectedPlan.name} plan successfully!`);
      setSelectedPlan(null);
      setFormData({ name: "", phone: "" });
    } catch (err) {
      console.error(err);
      setMessage("Failed to subscribe. Try again!");
    }
  };

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

      {/* Plans */}
      <div className="flex flex-col gap-4 mt-6 w-[95%] sm:w-[80%]">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-4 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <span className="font-bold text-lg">₹{plan.price}</span>
            </div>
            <p className="text-gray-500 mb-2">
              {plan.labour} free labours included, Coming charge: ₹{plan.comingCharge}
            </p>
            <button
              onClick={() => handlePlanClick(plan)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Select Plan <FaArrowRight />
            </button>

            {/* Form opens when plan selected */}
            {selectedPlan?.id === plan.id && (
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      {/* Help button */}
      <button
        onClick={() => alert("Contact support at support@example.com")}
        className="fixed z-10 top-5 right-4 flex items-center gap-2 bg-white backdrop-blur-md px-1 py-1 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all"
      >
        <HelpCircle className="w-5 h-5 text-gray-700" />
      </button>

      {/* Message */}
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default Subscription;