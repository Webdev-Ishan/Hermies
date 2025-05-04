import React from "react";

const Petinfo = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pet Image */}
          <div>
            <img
              src="/images/dog1.jpg"
              alt="Buddy"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Pet Details */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Buddy</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Type:</span> Dog
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Age:</span> 2 years
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-bold">Description:</span> Buddy is a
              friendly and playful dog who loves to be around people. He is
              well-trained and gets along well with other pets.
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Apply for Adoption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petinfo;