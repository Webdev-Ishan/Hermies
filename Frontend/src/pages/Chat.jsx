import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
import { url } from "../App";

// Declare socket outside component to persist
let socket = io("http://localhost:3000");

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [partner, setPartner] = useState(""); // Added missing partner state

  // Load initial chat history
  const loadchat = async () => {
    try {
      const response = await axios.get(`${url}/api/message/${id}`, {
        withCredentials: true,
      });
      
      if (response.data && response.data.success) {
        setMessages(response.data.messages); // adjust according to backend
        setPartner(response.data.messages.sender || "Unknown");
      }
    } catch (error) {
      console.error("Error loading chat:", error);
    }
  };

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      roomId: id,
      content: input,
      sender: "me",
      timestamp: new Date(),
    };

    // Emit via socket
    socket.emit("send-message", newMessage);

    // Add locally
    setMessages((prev) => [...prev, newMessage]);

    // Save to DB
    try {
      await axios.post(
        `${url}/api/message/${id}`,
        { input, sender: "partner" },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  useEffect(() => {
    loadchat();

    // Join the socket room
    socket.emit("join-room", id);

    // Handle incoming messages
    const handleReceive = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive-message", handleReceive);

    // Cleanup on unmount
    return () => {
      socket.off("receive-message", handleReceive);
    };
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 font-bold text-lg shadow">
        Chat with {partner}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs p-2 rounded-xl text-sm ${
              msg.sender === "me"
                ? "bg-black text-white ml-auto"
                : "bg-blue-600 text-white mr-auto"
            }`}
          >
            {msg.content || msg.message}
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="flex items-center gap-2 p-4 bg-white border-t"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
