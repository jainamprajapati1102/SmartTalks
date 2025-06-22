import React, { useState } from "react";

const Header = ({ username = "Guest", onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center  text-gray-600 p-1 ">
      <h2 className="text-lg font-semibold">SmartTalks</h2>
      
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className=" text-2xl px-2  rounded"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false);
                onLogout?.(); // optional callback
              }}
            >
              Logout
            </button>
            {/* You can add more menu items here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
