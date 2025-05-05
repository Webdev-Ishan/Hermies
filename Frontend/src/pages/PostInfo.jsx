import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";

const PostInfo = () => {
  const { id } = useParams(); // Extract post ID from the URL
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  // Fetch post details
  const fetchPostInfo = async () => {
    try {
      const response = await axios.get(`${url}/api/user/getPost/${id}`, {
        withCredentials: true,
      });

      if (response.data && response.data.success) {
        setPost(response.data.post); // Set the post data
      } else {
        toast.error("Failed to fetch post details.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deletePost = async () => {
    let result = await axios.post(`${url}/api/user/deletePost/${id}`,{id},{withCredentials:true,});
    if (result.data && result.data.success) {
      toast.success("Post deleted");
      navigate("/profile");
    } else {
      console.log(result.data);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchPostInfo();
  });

  if (!post) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <img
            src={post.images || "https://via.placeholder.com/400"}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">Description:</span> {post.description}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Status:</span> {post.adoptionStatus}
          </p>
          <button
            onClick={deletePost}
            className="bg-red-500 mt-3 text-white py-2 px-4 rounded-lg hover:bg-red-700 "
          >
            Delet Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
