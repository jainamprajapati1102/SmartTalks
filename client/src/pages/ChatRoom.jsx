import React, { useEffect, useState } from "react";
// import { useSocket } from "../hooks/useSocket";
import { FaPaperPlane } from "react-icons/fa";
import { useChat } from "../context/SelectedUserContext";
const ChatRoom = () => {
  // const socket = useSocket("http://localhost:5000");
  const [message, setMessage] = useState("");
  const { selectedUser } = useChat();
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   socket?.on("receive_message", (data) => {
  //     setMessages((prev) => [...prev, data]);
  //   });
  // }, [socket]);

  const sendMessage = () => {
    if (!message.trim()) return;
    // socket.emit("send_message", { text: message });
    setMessages((prev) => [...prev, { text: message }]);
    setMessage("");
  };

  return (
    <div className="flex flex-1 w-full h-full bg-gray-100">
      {/* Sidebar */}

      {/* Chat Area */}
      <div className="flex flex-col flex-1 h-full">
        <div className="bg-white p-2 font-semibold">{selectedUser ? `Chat with User ${selectedUser.name}`:'No user Selected'}</div>

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
