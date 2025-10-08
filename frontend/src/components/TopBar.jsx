import React from "react";
import { NavLink } from "react-router-dom";

const TopBar = () => {
  return (
    <NavLink
      to="/"
      className="fixed bg-gray-800/50 rounded-tr-2xl rounded-br-2xl z-20 top-3 left-0 py-2 px-4 flex items-center cursor-pointer"
    >
      <img
        src="/vite.svg"
        alt="Labour App Logo"
        className="w-8 h-8 mr-2"
      />
      <h1 className="text-lg font-semibold text-white">Labour App</h1>
    </NavLink>
  );
};

export default TopBar;