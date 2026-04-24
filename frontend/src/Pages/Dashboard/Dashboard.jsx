import { Link } from "react-router-dom";
import { getRole } from "../../Context/authContext";
import { useEffect, useState } from "react";
import API from "../../Api/axios";

const Dashboard = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const res = await API.get("/request/count");
      setCount(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const role = getRole();

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] bg-linear-to-br">
      {/* HERO SECTION */}
      <div
        className="relative h-60 flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <h2 className="relative text-3xl md:text-4xl font-bold">
          🍱 Food Donation Dashboard
        </h2>
      </div>

      {/* CONTENT */}
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-8 text-lg">
          Manage food donations and help reduce waste ❤️
        </p>

        {/* FLEX CONTAINER */}
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {/* NGO */}
          {role === "NGO" && (
            <>
              <Link
                to="/foods"
                className="group bg-white rounded-2xl p-6 w-full sm:w-75 shadow-md hover:shadow-xl transition hover:scale-[1.03]"
              >
                <div className="text-4xl mb-3">🍱</div>
                <h3 className="text-xl font-semibold mb-1">Browse Foods</h3>
                <p className="text-gray-500 text-sm">
                  Explore available food donations
                </p>
              </Link>

              <Link
                to="/my-requests"
                className="relative group bg-white rounded-2xl p-6 w-full sm:w-75 shadow-md hover:shadow-xl transition hover:scale-[1.03]"
              >
                {count > 0 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}

                <div className="text-4xl mb-3">📄</div>
                <h3 className="text-xl font-semibold mb-1">My Requests</h3>
                <p className="text-gray-500 text-sm">
                  Track all your requested food items
                </p>
              </Link>
            </>
          )}

          {/* SELF / RESTAURANT */}
          {(role === "SELF" || role === "RESTAURANT") && (
            <>
              <Link
                to="/add-food"
                className="group bg-white rounded-2xl p-6 w-full sm:w-75 shadow-md hover:shadow-xl transition hover:scale-[1.03]"
              >
                <div className="text-4xl mb-3">➕</div>
                <h3 className="text-xl font-semibold mb-1">Add Food</h3>
                <p className="text-gray-500 text-sm">
                  Donate surplus food easily
                </p>
              </Link>

              <Link
                to="/my-food"
                className="group bg-white rounded-2xl p-6 w-full sm:w-75 shadow-md hover:shadow-xl transition hover:scale-[1.03]"
              >
                <div className="text-4xl mb-3">🍱</div>
                <h3 className="text-xl font-semibold mb-1">My Foods</h3>
                <p className="text-gray-500 text-sm">
                  View and manage your food listings
                </p>
              </Link>

              <Link
                to="/food-requests"
                className="relative group bg-white rounded-2xl p-6 w-full sm:w-75 shadow-md hover:shadow-xl transition hover:scale-[1.03]"
              >
                {/* 🔴 BADGE */}
                {count > 0 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}

                <div className="text-4xl mb-3">📥</div>
                <h3 className="text-xl font-semibold mb-1">Requests</h3>
                <p className="text-gray-500 text-sm">
                  Handle incoming food requests
                </p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
