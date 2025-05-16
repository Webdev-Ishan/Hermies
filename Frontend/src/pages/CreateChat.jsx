import React, { useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NameForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chatPartner = await axios.get(`${url}/api/auth/profile`, {
      withCredentials: true,
    });

    let applicationIds = [];

    if (
      chatPartner.data &&
      chatPartner.data.success &&
      Array.isArray(chatPartner.data.userProfile?.adoptionApplications)
    ) {
      applicationIds = chatPartner.data.userProfile.adoptionApplications;
    }

    console.log(applicationIds);
    const onlyIds = applicationIds.map((app) => app._id);
    console.log(onlyIds);

    const receiverName = await Promise.all(
      onlyIds.map((appId) =>
        axios
          .get(`${url}/api/user/getApplications/${appId}`, {
            withCredentials: true,
          })
          .then((res) => res.data.application.recieverId.name)
          .catch(() => null)
      )
    );

    console.log(receiverName);

    const validReceivernames = receiverName.filter((name) => name);

    const allowed = validReceivernames.includes(name);

    if (!allowed) {
      toast.error(
        "You can only create chat with valid application recipients."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/chat/createRoom/`,
        { name },
        { withCredentials: true }
      );

      if (response.data?.success) {
        toast.success("Chat created");
        setName("");
        navigate("/AllChats");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Enter Name</h2>

      <input
        type="text"
        placeholder="Chat name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default NameForm;
