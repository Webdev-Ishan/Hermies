import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Profile from "../assets/Profile.webp";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Authcontext from "../Context/AuthContext";
import bg from "../assets/bg2.mp4";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [bio, setbio] = useState("");
  const [DP, setDP] = useState("");

  const { login } = useContext(Authcontext);
  const url = import.meta.env.VITE_API_URL;
  const submithandeler = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("bio", bio);
    formdata.append("profilePicture", DP); // Append the file

    console.log(DP);
    try {
      let response = await axios.post(`${url}/api/auth/register`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.success) {
        toast.success("Account created!!!");
        console.log("Account created");
        setname("");
        setemail("");
        setpassword("");
        setbio("");
        setDP("");
        login();
        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.me);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-cente  justify-center">
       <video
              className="absolute top-0  left-0 w-full h-full object-cover"
              src={bg}
              autoPlay
              loop
              muted
            ></video>
      <div className="bg-black mt-2 border-2 border-blue-600 text-white absolute p-3 rounded-lg shadow-lg w-full max-w-md">
        <h2
          className="text-4xl font-bold text-center  text-blue-600 mb-6"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "green",
          }}
        >
          Login
        </h2>
        <form onSubmit={submithandeler}>
          {/* Name */}
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-white font-medium "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="Enter your name"
              className="w-full px-4 bg-white text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white font-medium "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Enter your email"
              className="w-full px-4 bg-white text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white font-medium "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="w-full px-4 bg-white text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-white font-medium"
            >
              Bio
            </label>
            <input
              type="textarea"
              id="bio"
              value={bio}
              onChange={(e) => {
                setbio(e.target.value);
              }}
              placeholder="Enter your bio here"
              className="w-full px-4 py-2 border bg-white text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="DP"
              src={Profile}
              className="block text-white font-medium "
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="DP"
              accept="image/*"
              name="profilePicture" // This must match the backend field name
              onChange={(e) => setDP(e.target.files[0])}
              className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
