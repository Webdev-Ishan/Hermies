import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [Title, setTitle] = React.useState("");
  const [petType, setPetType] = React.useState("");
  const [petDescription, setPetDescription] = React.useState("");
  const [petImage, setPetImage] = React.useState("");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const submithandeler = async (e) => {
    e.preventDefault();
    let formndata = new FormData();
    formndata.append("title", Title);
    formndata.append("type", petType);
    formndata.append("description", petDescription);
    formndata.append("image", petImage);

    try {
      let response = await axios.post(
        `${url}/api/user/createPost`,
        formndata,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      if (response.data && response.data.success) {
        toast.success("Post created");

        setTitle("");
        setPetType("");
        setPetDescription("");
        setPetImage(null);
        navigate("/");
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create a Post</h2>
        <form onSubmit={submithandeler}>
          {/* Pet Name */}
          <div className="mb-4">
            <label
              htmlFor="petName"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="petName"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter pet's name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pet Type */}
          <div className="mb-4">
            <label
              htmlFor="petType"
              className="block text-gray-700 font-medium mb-2"
            >
              Type
            </label>
            <select
              id="petType"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select pet type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
              <option value="bird">Bird</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Pet Description */}
          <div className="mb-4">
            <label
              htmlFor="petDescription"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="petDescription"
              placeholder="Enter a description for the pet"
              value={petDescription}
              onChange={(e) => {
                setPetDescription(e.target.value);
              }}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Pet Image */}
          <div className="mb-4">
            <label
              htmlFor="petImage"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Pet Image
            </label>
            <input
              type="file"
              id="petImage"
              onChange={(e) => setPetImage(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
