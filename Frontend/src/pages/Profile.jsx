import React, { useEffect } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Authcontext from "../Context/AuthContext";
import { useContext } from "react";

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [DP, setDP] = React.useState(
    "https://imgs.search.brave.com/vD1b_HCFCmNgGZQHC1-aC07MQ6Iw-bZfWCiF9nijnXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dXNlci1jaXJjbGVz/LXNldF83ODM3MC00/NzA0LmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDA"
  );
  const [application, setApplication] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [recievedApplications,setrecievedApplications]=React.useState([])

  const { logout } = useContext(Authcontext);
  const getProfile = async () => {
    try {
      let response = await axios.get(`${url}/api/auth/profile`, {
        withCredentials: true,
      });
      //console.log(response.data)

      if (response.data && response.data.success) {
        setName(response.data.userProfile.name);
        setEmail(response.data.userProfile.email);
        setBio(response.data.userProfile.bio);
        setDP(response.data.userProfile.profilePicture);
        setApplication(response.data.userProfile.adoptionApplications);
        setPosts(response.data.userProfile.posts);
        setrecievedApplications(response.data.userProfile.recievedApplications)
      } else {
        toast.error("Something went wrong!!!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    let response = await axios.post(
      `${url}/api/auth/logout`,
      { withCredentials: true },
      { email }
    );
    if (response.data && response.data.success) {
      toast.success("Logged Out successfull!!");
      logout();
      navigate("/login");
    }
  };

  const getHome = async () => {
    navigate("/");
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* User Info Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img
              src={DP}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-gray-600">{email}</p>
              <p className="text-gray-600">{bio}</p>
            </div>
          </div>
          <button
            onClick={getHome}
            className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-lg hover:bg-red-700 "
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 "
          >
            Logout
          </button>
        </div>

        {/* Adoption Applications Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Your Adoption Applications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {application.map((app, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="text-gray-600">
                  <span className="font-extrabold">Status:</span> {app.status}
                </p>
                <Link
                  to={`/application/${app._id}`}
                  className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Your Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((app, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="text-gray-600">
                  <span className="font-extrabold">Title:</span> {app.title}
                </p>
                <p className="text-gray-600">
                  <span className="font-extrabold">Description:</span>{" "}
                  {app.description}
                </p>
                <p className="text-gray-600">
                  <span className="font-extrabold">Status:</span>{" "}
                  {app.adoptionStatus}
                </p>
                <Link
                  to={`/postInfo/${app._id}`}
                  className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>


  {/* Recieved Applications Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Your Recieved Applications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recievedApplications.map((app, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="text-gray-600">
                  <span className="font-extrabold">Status:</span> {app.status}
                </p>
                <Link
                  to={`/application/${app._id}`}
                  className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Cancel
                </Link>
                  <Link
                  to={`/accept/${app._id}`}
                  className="mt-4 inline-block m-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>



      </div>
    </div>
  );
};

export default Profile;
