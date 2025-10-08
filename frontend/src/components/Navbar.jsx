import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTools, FaCrown, FaEnvelope, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 py-5 flex justify-around items-center shadow-md">
      {/* 🔹 Home */}
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive
              ? "text-blue-500 scale-110 drop-shadow-md"
              : "text-gray-400 hover:text-gray-500"
          }`
        }
      >
        <FaHome className="text-xl" />
      </NavLink>

      {/* 🔹 Problem */}
      <NavLink
        to="/problem"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive
              ? "text-blue-500 scale-110 drop-shadow-md"
              : "text-gray-400 hover:text-gray-500"
          }`
        }
      >
        <FaTools className="text-xl" />
      </NavLink>

      {/* 🔹 Subscription */}
      <NavLink
        to="/subscription"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive
              ? "text-yellow-500 scale-110 drop-shadow-md"
              : "text-gray-400 hover:text-gray-500"
          }`
        }
      >
        <FaCrown className="text-xl" />
      </NavLink>

      {/* 🔹 Messages */}
      <NavLink
        to="/messages"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive
              ? "text-blue-500 scale-110 drop-shadow-md"
              : "text-gray-400 hover:text-gray-500"
          }`
        }
      >
        <FaEnvelope className="text-xl" />
      </NavLink>

      {/* 🔹 Profile */}
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive
              ? "text-blue-500 scale-110 drop-shadow-md"
              : "text-gray-400 hover:text-gray-500"
          }`
        }
      >
        <FaUser className="text-xl" />
      </NavLink>
    </div>
  );
};

export default Navbar;