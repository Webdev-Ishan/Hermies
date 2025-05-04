import React from "react";

const CreatePost = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create a Post</h2>
        <form>
          {/* Pet Name */}
          <div className="mb-4">
            <label htmlFor="petName" className="block text-gray-700 font-medium mb-2">
              Pet Name
            </label>
            <input
              type="text"
              id="petName"
              placeholder="Enter pet's name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pet Type */}
          <div className="mb-4">
            <label htmlFor="petType" className="block text-gray-700 font-medium mb-2">
              Pet Type
            </label>
            <select
              id="petType"
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

          {/* Pet Age */}
          <div className="mb-4">
            <label htmlFor="petAge" className="block text-gray-700 font-medium mb-2">
              Pet Age
            </label>
            <input
              type="text"
              id="petAge"
              placeholder="Enter pet's age"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pet Description */}
          <div className="mb-4">
            <label htmlFor="petDescription" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="petDescription"
              placeholder="Enter a description for the pet"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Pet Image */}
          <div className="mb-4">
            <label htmlFor="petImage" className="block text-gray-700 font-medium mb-2">
              Upload Pet Image
            </label>
            <input
              type="file"
              id="petImage"
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
