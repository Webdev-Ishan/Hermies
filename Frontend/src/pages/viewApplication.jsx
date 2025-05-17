import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ApplicationPage = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [Title, settitle] = useState("");
  const [message, setmessage] = useState("");
  const url = import.meta.env.VITE_API_URL;
  const fetchapply = async () => {
    let response = await axios.get(`${url}/api/user/getApplications/${id}`, {
      withCredentials: true,
    });
    settitle(response.data.application.adminRemarks);
    setmessage(response.data.application.message);
  };

  const acceptit = async () => {
    const result = await axios.post(
      `${url}/api/user/accept/${id}`,
      { id },
      {
        withCredentials: true,
      }
    );

    
    if (result.data.success) {
      toast.success("Application accepted");
      navigate("/");
    } else {
      toast.error("Somethign went wrong");
    }
  };

  const rejectit = async () => {
    const result = await axios.post(
      `${url}/api/user/reject/${id}`,
      { id },
      {
        withCredentials: true,
      }
    );

    console.log(result);
    if (result.data.success) {
      toast.success("Application Rejected");
      navigate("/");
    } else {
      toast.error("Somethign went wrong");
    }
  };

  useEffect(() => {
    fetchapply();
  });

  return (
    <div
      className="min-h-[95vh] p-5 text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=600')",
      }}
    >
      <h1 className="text-4xl text-black mb-10">Application Information</h1>
      <p className="text-blue-600 mb-10">
        <b className="text-black">NOTE:</b> You can accept or reject application
        based on the information provided.
      </p>
      <p className="text-blue-500 mb-3">
        {" "}
        <span className="text-black font-bold ">Title:</span> {Title}
      </p>
      <p className="text-blue-500 mb-3">
        {" "}
        <span className="text-black font-bold">Title:</span> {message}
      </p>
      <button
        onClick={acceptit}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md mt-5"
      >
        Accept Application
      </button>

      <button
        onClick={rejectit}
        className="bg-red-500 ml-2 hover:bg-red-700 text-white px-6 py-3 rounded-md mt-5"
      >
        Reject Application
      </button>
    </div>
  );
};

export default ApplicationPage;
