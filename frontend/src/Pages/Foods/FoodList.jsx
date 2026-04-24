import { useEffect, useState } from "react";
import API from "../../Api/axios";
import toast from "react-hot-toast";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await API.get("/food/allFoods");
      setFoods(res.data);
    } catch (err) {
      console.log("Error fetching foods");
    }
  };

  const filteredFoods = foods
    .filter((f) => (f.title || "").toLowerCase().includes(search.toLowerCase()))
    .filter((f) => (filter === "ALL" ? true : f.status === "AVAILABLE"));

  const handleRequest = async (id) => {
    try {
      await API.post(`/request/${id}`);
      toast.success("Request Send")
    } catch {
      toast.error("Already requested");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-green-50 via-white to-blue-50 p-6">
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
        Available Foods
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-xl shadow-md overflow-hidden 
            transition duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* IMAGE */}
            <img
              src={food.imageUrl || "https://via.placeholder.com/300"}
              alt={food.name}
              className="w-full h-48 object-cover transition duration-300 hover:scale-105"
            />

            {/* DETAILS */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {food.title}
              </h3>

              <p className="text-sm text-gray-600">Quantity: {food.quantity}</p>

              <p className="text-sm text-gray-600">Location: {food.location}</p>

              <p className="text-sm text-gray-500">
                Expiry: {new Date(food.expiryTime).toLocaleString()}
              </p>

              {/* STATUS */}
              <span
                className={`text-xs px-3 py-2 rounded-full ${
                  food.status === "AVAILABLE"
                    ? "bg-green-800 text-white"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {food.status}
              </span>

              {/* BUTTON */}
              {food.status === "AVAILABLE" && (
                <button
                  onClick={() => handleRequest(food.id)}
                  className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg 
                  transition duration-300 hover:bg-green-700 hover:scale-[1.02]"
                >
                  Request Food
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No food available</p>
      )}
    </div>
  );
};

export default FoodList;
