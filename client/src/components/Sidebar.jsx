// components/Sidebar.jsx
import React, { useState } from "react";
import Header from "./Header";

const Sidebar = ({ activeTab, setActiveTab, search, setSearch }) => {
  const tabs = ["All", "Unread", "Favorites", "Groups"];

  return (
    <div className="w-[350px] bg-white border-r shadow-sm flex flex-col">
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
        <li className="p-4 hover:bg-gray-100 cursor-pointer ">User 1</li>
      </ul>
    </div>
  );
};

export default Sidebar;
