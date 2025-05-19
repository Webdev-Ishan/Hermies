import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Authcontext from "../Context/AuthContext";
import bg from "../assets/bg2.mp4";
const Login = () => {
  const naviagte = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { login } = useContext(Authcontext);
  const submithandeler = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL;
    console.log(url);
    try {
      let response = await axios.post(
        `${url}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.data && response.data.success) {
        toast.success("Account logged in!!!");
        console.log("Account logged in ");
        setemail("");
        setpassword("");
        login();
        naviagte("/profile");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={bg}
        autoPlay
        loop
        muted
      ></video>
      <div className="bg-black text-white absolute border-2 border-blue-600 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2
          className="text-4xl font-bold text-center text-blue-600 mb-6"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "green",
          }}
        >
          Login
        </h2>
        <form onSubmit={submithandeler}>
          {/* Email Input */}
          <div className="mb-4 ">
            <label
              htmlFor="email"
              className="block text-blue-600 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 bg-white text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-blue-600 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-white text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
