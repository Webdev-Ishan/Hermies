import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Review = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await axios.post(
      `${url}/api/review/sendReview`,
      {
        title,
        description,
      },
      { withCredentials: true }
    );
    console.log(response);

    if (response.data && response.data.success) {
      toast.success("Review is submitted successfully!!");
      settitle("");
      setdescription("");
      navigate("/");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl border-2 border-black">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-500">
            Give us a Review
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label
                htmlFor="adminRemarks"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title for Review
              </label>
              <input
                type="text"
                id="adminRemarks"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Enter some special remark"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Please give your reviews
              </label>
              <textarea
                id="message"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
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

export default Review;
