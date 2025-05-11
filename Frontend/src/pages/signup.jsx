import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";
import Profile from "../assets/Profile.webp";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Authcontext from "../Context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [bio, setbio] = useState("");
  const [DP, setDP] = useState("");

  const { login } = useContext(Authcontext);

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
        console.log("Something went wrong", response);
        toast.error("Something went wrong");
      }
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-3">Sign Up</h2>
        <form onSubmit={submithandeler}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-gray-700 font-medium mb-1"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="DP"
              src={Profile}
              className="block text-gray-700 font-medium mb-1"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="DP"
              accept="image/*"
              name="profilePicture" // This must match the backend field name
              onChange={(e) => setDP(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
