import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Petinfo = () => {
  const [image, setimage] = useState(null);
  const [title, settile] = useState("");
  const [description, setdescription] = useState("");
  const [author, setauthor] = useState("");
  const [type, settype] = useState("");
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const pet = async () => {
    try {
      let response = await axios.get(`${url}/api/user/petinfo/${id}`);

      if (response.data && response.data.success) {
        settile(response.data.petition.title);
        setdescription(response.data.petition.description);
        setimage(response.data.petition.images);
        setauthor(response.data.petition.author.name);
        settype(response.data.petition.type);
      } else {
        toast.error("Somethign went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    pet();
  });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white border-2 border-blue-500 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pet Image */}
          <div className="hover:opacity-90 duration-300">
            <img
              src={image}
              alt="Buddy"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Pet Details */}
          <div>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Type: </span>
              {type}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Author</span> {author}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-bold">Description:</span> {description}
            </p>
            <Link
              to={`/Adoption/${id}`}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Apply for Adoption
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petinfo;
