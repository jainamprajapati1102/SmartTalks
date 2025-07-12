// components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { search_user } from "../services/userService";
import placeholderImg from "../assets/placeholder.png";
import { useChat } from "../context/SelectedUserContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab, search, setSearch }) => {
  const tabs = ["All", "Unread", "Favorites", "Groups"];
  const [search_result, setSearch_result] = useState([]);
  let { setSelectedUser } = useChat();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!search?.trim()) {
        setSearch_result([]);
        return;
      }

      try {
        const formdata = new FormData();
        formdata.append("mobile", search);
        const response = await search_user(formdata);
        setSearch_result(response.data.find_user);
        // setSelectedUser(response.data.find_user);
      } catch (error) {
        console.error("Search error:", error.message);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);
  return (
    <div className="w-[450px] bg-white border-r shadow-sm flex flex-col">
      <Header />
      {/* Tabs */}
      <div className="flex gap-1 px-2 py-2  bg-white">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition-all
              ${
                activeTab === tab
                  ? "bg-green-200 text-black border-green-400"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-yellow-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="p-2 ">
        <input
          type="text"
          placeholder="Search chats"
          className="w-full px-3 py-1 rounded-full border text-sm focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Chat List */}
      <ul className="overflow-y-auto flex-1">
        {Array.isArray(search_result) &&
          search_result.length > 0 &&
          search_result.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedUser(item);
                navigate("/chat");
              }}
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
            >
              <img
                src={item.profilePic ? item.profilePic : placeholderImg}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
