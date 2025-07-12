import React, { useState } from "react";
import { logoutUser } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserFriends, FaStar, FaCheckSquare, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.status === 200) {
        toast.success(res.msg || "Logged out successfully");
        setUser(null);
        navigate("/login");
      }
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between items-center text-gray-600 p-1">
      <h2 className="text-lg font-semibold">SmartTalks</h2>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl px-2 rounded"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 p-2 bg-white text-black rounded-2xl shadow-lg z-50">
            <button className="w-full flex items-center gap-3 text-left px-4 py-2 hover:bg-gray-100">
              <FaUserFriends /> New group
            </button>
            <button className="w-full flex items-center gap-3 text-left px-4 py-2 hover:bg-gray-100">
              <FaStar /> Starred messages
            </button>
            <button className="w-full flex items-center gap-3 text-left px-4 py-2 hover:bg-gray-100">
              <FaCheckSquare /> Select chats
            </button>

            {/* Divider above logout */}
            <div className="border-t my-2"></div>

            <button
              className="w-full flex items-center gap-3 text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
            >
              <FaSignOutAlt /> Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
