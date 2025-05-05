import React, { useState } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";

const Adoption = () => {
  const { id } = useParams(); // Extract the post ID from the URL
  const [message, setMessage] = useState("");
  const[adminRemarks,setadminremarks]=useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}/api/user/apply/${id}`,
        {
          id, // Send the post ID
          adminRemarks,
          message, // Send the user's message
        },
        { withCredentials: true } // Include cookies for authentication
      );

      if (response.data && response.data.success) {
        toast.success("Application submitted successfully!");
        setMessage("");
        setadminremarks("");
        navigate("/profile"); // Redirect to the profile page
      } else {
        toast.error(response.data.message || "Failed to submit application.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 py-10">
        <div className="container mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl border-2 border-black">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-500">
                    Apply for Adoption
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label
                            htmlFor="adminRemarks"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Special Remarks
                        </label>
                        <input
                            type="text"
                            id="adminRemarks"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={adminRemarks}
                            onChange={(e) => setadminremarks(e.target.value)}
                            placeholder="Enter some special remark"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Why do you want to adopt this pet?
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="5"
                            placeholder="Write your message here..."
                            required
                        ></textarea>
                    </div>
                    <a
                        href="#"
                        onClick={handleSubmit}
                        className="block text-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-bold text-lg"
                    >
                        Submit Application
                    </a>
                </form>
            </div>
        </div>
    </div>
);
};

export default Adoption;