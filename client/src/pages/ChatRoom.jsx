import React, { useEffect, useState } from "react";
// import { useSocket } from "../hooks/useSocket";
import { FaPaperPlane } from "react-icons/fa";
import { useChat } from "../context/SelectedUserContext";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../assets/placeholder.png";

const ChatRoom = () => {
  // const socket = useSocket("http://localhost:5000");
  const [message, setMessage] = useState("");
  const { selectedUser, setSelectedUser } = useChat();
  const [messages, setMessages] = useState([]);
  const [showMenu, setShowMenu] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   socket?.on("receive_message", (data) => {
  //     setMessages((prev) => [...prev, data]);
  //   });
  // }, [socket]);
  useEffect(() => {
    if (!selectedUser) {
      navigate("/");
    }
  }, [selectedUser]);

  const sendMessage = () => {
    if (!message.trim()) return;
    // socket.emit("send_message", { text: message });
    setMessages((prev) => [...prev, { text: message }]);
    setMessage("");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null); // Clear selected user
        navigate("/"); // Go to home
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="flex flex-1 w-full h-full  bg-gray-100">
      {/* Sidebar */}

      {/* Chat Area */}
      <div className="flex flex-col flex-1 h-full">
        <div className="bg-white p-2 flex items-center justify-between border-b shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={selectedUser?.profilePic || placeholderImg}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold text-lg">{selectedUser?.name}</span>
          </div>

          {/* 3 Dot Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="text-gray-600 hover:text-black focus:outline-none"
            >
              ⋮
            </button>

            {showMenu && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 text-sm">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => alert("Show Contact Info")}
                >
                  Contact Info
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => alert("Select Messages")}
                >
                  Select Messages
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => alert("Added to Favorite")}
                >
                  Add to Favorite
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedUser(null);
                    navigate("/");
                  }}
                >
                  Close Chat
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs md:max-w-md lg:max-w-lg mb-2 px-4 py-2 rounded-lg ${
                idx % 2 === 0
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-white text-black self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white flex gap-2 ">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer"
          >
            {/* Send */}
            <FaPaperPlane size={20} style={{ cursor: "pointer" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
