// Header.jsx
import React, { useState } from "react";
import { logoutUser } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setUser } = useAuth(); // ✅ to clear auth state
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const res = await logoutUser(); // ✅ call the function
      if (res.status === 200) {
        toast.success(res.msg || "Logged out successfully");
        setUser(null); // ✅ clear auth state
        navigate("/login"); // ✅ redirect to login
      }
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between items-center text-gray-600 p-1 ">
      <h2 className="text-lg font-semibold">SmartTalks</h2>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl px-2 rounded"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false);
                onLogout(); // ✅ must call the function with ()
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
  