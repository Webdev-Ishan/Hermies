import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.h1
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-5xl font-bold text-shadow-md text-shadow-amber-400  text-center text-yellow-500 mb-10"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "black",
          }}
        >
          FEATURED PETS
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                key={pet.id}
                className="bg-white shadow-lg hover:shadow-green-500 hover:border-green-500 shadow-blue-500 rounded-lg m-3 overflow-hidden border-2 border-blue-500"
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
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allpets;
