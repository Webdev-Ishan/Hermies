import React from "react";
import dog from '../assets/dog.jpg';
import cat from '../assets/cat.jpg';
import rabbit from '../assets/rabbit.jpg';

const Homepage = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/3040808/3040808-sd_640_360_30fps.mp4"
          autoPlay
          loop
          muted
        ></video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full "></div>

        {/* Hero Content */}
        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">Welcome to Hermies</h1>
          <p className="text-lg mb-6">Your one-stop platform for pet adoption and care.</p>
          <a href="/all-pets" className="bg-blue-500 hover:bg-blue-600 mr-4 text-white font-bold py-3 px-6 rounded-lg">
            Explore All Pets
          </a>
          <a href="/Aihelp" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
            Ask from AI
          </a>
        </div>

        
      </section>

      {/* Featured Pets Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pet Card 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={dog} alt="Buddy" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Buddy</h3>
                <p className="text-gray-600">Type: Dog</p>
                <p className="text-gray-600">Age: 2 years</p>
                <a href="/pets/1" className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg">
                  View Details
                </a>
              </div>
            </div>
            {/* Pet Card 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={cat} alt="Whiskers" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Whiskers</h3>
                <p className="text-gray-600">Type: Cat</p>
                <p className="text-gray-600">Age: 1 year</p>
                <a href="/pets/2" className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg">
                  View Details
                </a>
              </div>
            </div>
            {/* Pet Card 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={rabbit} alt="Coco" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Coco</h3>
                <p className="text-gray-600">Type: Rabbit</p>
                <p className="text-gray-600">Age: 6 months</p>
                <a href="/pets/3" className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-r from-slate-600 to-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Looking to Adopt or Post a Pet?</h2>
        <p className="text-lg mb-6">Join our community and make a difference in a pet's life today.</p>
        <div className="flex justify-center gap-4">
          <a href="/create-post" className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500">
            Post a Pet
          </a>
          <a href="/donate" className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500">
            Donate
          </a>
          <a href="/profile" className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500">
            View Profile
          </a>
        </div>
      </section>
    </div>
  );
};

export default Homepage;