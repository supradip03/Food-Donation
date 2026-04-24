import { useEffect, useState } from "react";
import API from "../../Api/axios";
import toast from "react-hot-toast";

const OrderedFood = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/request/foodRequests");

      // ✅ only completed
      const completed = res.data.filter(
        (req) => req.status === "COMPLETED"
      );

      setOrders(completed);
    } catch {
      toast.error("Error fetching orders");
    }
  };

  const getFoodImage = (title) => {
    const name = title.toLowerCase();

    if (name.includes("rice")) return "https://images.unsplash.com/photo-1604908176997-4312c65f6c03";
    if (name.includes("pizza")) return "https://images.unsplash.com/photo-1601924582975-7e9d39d7a7f3";
    if (name.includes("burger")) return "https://images.unsplash.com/photo-1550547660-d9450f859349";
    if (name.includes("chicken")) return "https://images.unsplash.com/photo-1604908812739-7a74c4c7b0a4";

    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836";
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">
        Completed Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No completed orders yet
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((req) => (
            <div
              key={req.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-56 shadow-md hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02]"
            >
              {/* IMAGE (60%) */}
              <div className="w-full md:w-3/5 overflow-hidden">
                <img
                  src={getFoodImage(req.food.title)}
                  alt="food"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="w-full md:w-2/5 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    🍱 {req.food.title}
                  </h3>

                  <p className="text-sm md:text-base text-gray-700">
                    👤 {req.user.username}
                  </p>
                  <p className="text-sm md:text-base text-gray-700">
                    📦 {req.food.quantity}
                  </p>
                  <p className="text-sm md:text-base text-gray-700 truncate">
                    📍 {req.food.location}
                  </p>
                </div>

                <span className="inline-block mt-3 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                  COMPLETED
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderedFood;