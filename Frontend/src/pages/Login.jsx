import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Authcontext from "../Context/AuthContext";
const Login = () => {
  const naviagte = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { login } = useContext(Authcontext);
  const submithandeler = async (e) => {
    e.preventDefault();

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
        console.log("Something went wrong", response);
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={submithandeler}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
