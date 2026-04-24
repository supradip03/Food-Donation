const About = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-x-hidden flex items-center justify-center bg-linear-to-br bg-gray-50">
      <div className="max-w-4xl bg-white shadow-lg rounded-xl p-8">
        
        <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">
          About FoodDonate 🍱
        </h1>

        <p className="text-gray-700 text-lg mb-4 text-center">
          FoodDonate is a platform designed to connect food donors with NGOs and people in need.
          Our mission is to reduce food waste and ensure that surplus food reaches those who need it the most.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h2 className="font-semibold text-lg mb-2">🌍 Our Mission</h2>
            <p className="text-gray-600">
              Reduce food wastage and help needy people.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h2 className="font-semibold text-lg mb-2">🤝 Who Can Use</h2>
            <p className="text-gray-600">
              NGOs, Restaurants, and Individuals.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h2 className="font-semibold text-lg mb-2">🚀 Our Vision</h2>
            <p className="text-gray-600">
              A world with zero hunger and zero food waste.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;