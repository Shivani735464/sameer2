import React from "react";

const TopBar = () => {
  return (
    <div className="fixed bg-blue-200 rounded-tr-2xl rounded-br-2xl z-20 top-3 left-0 py-2 px-4 flex items-center">
      <img
        src="/vite.svg" // 👈 your logo image (place in public/logo.png)
        alt="Labour App Logo"
        className="w-8 h-8 mr-2"
      />
      <h1 className="text-lg font-semibold text-white">Labour App</h1>
    </div>
  );
};

export default TopBar;