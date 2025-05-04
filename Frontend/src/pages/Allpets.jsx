import React from "react";

const Allpets = () => {
  const pets = [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      age: "2 years",
      image: "/images/dog1.jpg",
    },
    {
      id: 2,
      name: "Whiskers",
      type: "Cat",
      age: "1 year",
      image: "/images/cat1.jpg",
    },
    {
      id: 3,
      name: "Coco",
      type: "Rabbit",
      age: "6 months",
      image: "/images/rabbit1.jpg",
    },
    {
      id: 4,
      name: "Charlie",
      type: "Dog",
      age: "3 years",
      image: "/images/dog2.jpg",
    },
    {
      id: 5,
      name: "Mittens",
      type: "Cat",
      age: "2 years",
      image: "/images/cat2.jpg",
    },
    {
      id: 6,
      name: "Snowball",
      type: "Rabbit",
      age: "1 year",
      image: "/images/rabbit2.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">All Pets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
                <p className="text-gray-600">Type: {pet.type}</p>
                <p className="text-gray-600">Age: {pet.age}</p>
                <a
                  href={`/pets/${pet.id}`}
                  className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allpets;
