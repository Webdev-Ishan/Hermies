import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ApplicationInfo = () => {
  const navigate = useNavigate();
  const [authorid, setauthorid] = useState("");
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const fetchapply = async () => {
    let response = await axios.get(`${url}/api/user/getApplications/${id}`, {
      withCredentials: true,
    });
    //console.log(response.data.application.recieverId)
    setauthorid(response.data.application.recieverId);
    //console.log(response.data.application.recieverId.name)
  };

  const handleCancelApplication = async () => {
    try {
      let result = await axios.post(
        `${url}/api/user/cancel/${id}`,
        { id, recieverId: authorid },
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success("Application cancelled");
        navigate("/");
      } else {
        toast.error("Somethign went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchapply();
  });
  return (
    <div
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=600')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "95vh",
        padding: "20px",
        color: "white",
      }}
    >
      <h1 className="text-4xl text-black mb-10">Application Information</h1>
      <p className="text-red-600 mb-10">
        Your Application will be cancelled if you click Cancel.
      </p>
      {/* Add application details here */}
      <button
        onClick={handleCancelApplication}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Cancel Application
      </button>
    </div>
  );
};

export default ApplicationInfo;
