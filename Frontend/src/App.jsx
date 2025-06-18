import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PetInfo from "./pages/Petinfo";
import Donation from "./pages/Donation";
import CreatePost from "./pages/CreatePost";
import AllPets from "./pages/Allpets";
import AIhelp from "./pages/AIhelp";
import Postsinfo from "./pages/PostInfo";
import Adoption from "./pages/Adoption";
import Application from "./pages/ApplicationInfo";
import ApplicationPage from "./pages/ViewApplication";
import Review from "./pages/Review";
import Protected from "./Components/Protected";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <Protected>
                {" "}
                <Profile />{" "}
              </Protected>
            }
          />
          <Route path="/pets/:id" element={<PetInfo />} />
          <Route path="/donate" element={<Donation />} />
          <Route
            path="/create-post"
            element={
              <Protected>
                {" "}
                <CreatePost />{" "}
              </Protected>
            }
          />
          <Route path="/all-pets" element={<AllPets />} />
          <Route path="/AIhelp" element={<AIhelp />} />
          <Route path="/postInfo/:id" element={<Postsinfo />} />
          <Route
            path="/Adoption/:id"
            element={
              <Protected>
                {" "}
                <Adoption />{" "}
              </Protected>
            }
          />
          <Route path="/Application/:id" element={<Application />} />
          <Route path="/Accept/:id" element={<ApplicationPage />} />
          <Route
            path="/Review"
            element={
              <Protected>
                {" "}
                <Review />{" "}
              </Protected>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
