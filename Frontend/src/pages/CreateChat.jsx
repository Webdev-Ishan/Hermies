// components/NameForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NameForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    let response = await axios.post(
      `${url}/api/chat/createRoom/`,
       {
          name,
          
        },
        { withCredentials: true } // Include cookies for authentication
    );


    if (  response.data && response.data.success) {
      toast.success("Chat created");
      setName("");
      navigate("/AllChats");
      
    }
    else{
        toast.error("something went wrong")
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Enter Name</h2>

      <input
        type="text"
        placeholder="Chat name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default NameForm;
