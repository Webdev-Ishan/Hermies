import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Profile from "./pages/Profile";
import PetInfo from "./pages/Petinfo";
import Donation from "./pages/Donation";
import CreatePost from "./pages/CreatePost";
import AllPets from "./pages/Allpets";
import AIhelp from "./pages/AIhelp";
import Postsinfo from './pages/postInfo'
import Adoption from './pages/Adoption'
import Application from './pages/ApplicationInfo'

export const url ='http://localhost:3000'

const App = () => {
  
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pets/:id" element={<PetInfo />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/all-pets" element={<AllPets />} />
        <Route path="/AIhelp" element={<AIhelp />} />
        <Route path="/postInfo/:id" element={<Postsinfo />} />
        <Route path="/Adoption/:id" element={<Adoption />} />
        <Route path="/Application/:id" element={<Application />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;

