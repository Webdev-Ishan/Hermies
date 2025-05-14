import React, { useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { url } from "../App";

let socket = io("http://localhost:3000");

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
 
  const [input, setInput] = useState("");
  const [partner,setpartner]=useState("")

  const loadchat = async () => {
    let response = await axios.get(`${url}/api/message/${id}`,{
      withCredentials: true,
    });
    console.log(response.data);
    if (response.data && response.data.success) {
       setpartner(response.data.response.chatname)
      setMessages(response.data.response);
    }
  };




  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("join", input);
    setInput("");
  };

  useEffect(() => {
    loadchat();

   
    const handleResponse = (data) => {
      console.log(`${data}`); // This will now log only once
    };

    // Setup socket listener inside useEffect to avoid duplicate listeners
    socket.on('response', handleResponse);

    // Cleanup function to remove the socket listener when component unmounts
    return () => {
      socket.off('response', handleResponse);
    };


  }, []);

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
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-black mr-auto"
            }`}
          >
            {msg.text}
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
