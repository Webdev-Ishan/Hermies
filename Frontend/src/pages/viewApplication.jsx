import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { url } from "../App";
import { toast } from "react-toastify";

const ApplicationPage = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const acceptit = async () => {
    const result = await axios.post(
      `${url}/api/user/accept/${id}`,
      { id },
      {
        withCredentials: true,
      }
    );

    console.log(result);
    if (result.data.success) {
      toast.success("Application accepted");
      navigate("/");
    } else {
      toast.error("Somethign went wrong");
    }
  };

  return (
    <div
      className="min-h-[95vh] p-5 text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=600')",
      }}
    >
      <h1 className="text-4xl text-black mb-10">Application Information</h1>
      <p className="text-blue-600 mb-10"></p>

      <button
        onClick={acceptit}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md mt-5"
      >
        Accept Application
      </button>
    </div>
  );
};

export default ApplicationPage;
