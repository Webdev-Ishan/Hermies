import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { url } from "../App";

const ChatInfo = () => {
  const [Chats, setChats] = useState([]);

  const fetchAllchats = async () => {
    let response = await axios.get(`${url}/api/chat/getallChats`, {
      withCredentials: true,
    });
console.log(response.data)
    if (response.data && response.data.success) {
      setChats(response.data.response.chats);
    }
  };



  useEffect(() => {
    fetchAllchats();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Chat Info Header */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Chats</h2>
          <Link
            to={`/create-chat`}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            New Chat
          </Link>
        </div>

        {/* Chat Cards */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Chats.map((chat, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {chat.name}
                </h3>
                <p className="text-gray-600 mt-2">{chat.message}</p>
                <Link
                  to={`/chat/${chat._id}`}
                  className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View Chat
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
