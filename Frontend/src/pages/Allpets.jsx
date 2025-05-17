import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Allpets = () => {
  const [pets, setpets] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const getALL = async () => {
    try {
      let response = await axios.get(`${url}/api/user/allposts`, {
        withCredentials: true,
      });
      if (response.data && response.data.success) {
        setpets(response.data.response);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getALL();
  }, []);

  return (
    <div className="min-h-screen bg-black py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">
          All Pets
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-blue-500"
            >
              <img
                src={pet.images}
                alt={pet.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{pet.title}</h3>
                <p className="text-black">
                  <span className="font-bold">Desc:</span>{" "}
                  <span className="font-normal">{pet.description}</span>
                </p>
                <p className="text-black">
                  <span className="font-bold">Author:</span>{" "}
                  <span className="font-normal">{pet.author.name}</span>
                </p>
                <Link
                  to={`/pets/${pet._id}`}
                  className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allpets;
