import { useEffect, useState } from "react";
import API from "../../Api/axios";
import toast from "react-hot-toast";

const NgoRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/request/myRequests");
      setRequests(res.data);
    } catch {
      toast.error("Error fetching requests");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  // same image logic
  const getFoodImage = (title) => {
    const name = title.toLowerCase();

    if (name.includes("rice"))
      return "https://images.unsplash.com/photo-1604908176997-4312c65f6c03";
    if (name.includes("pizza"))
      return "https://images.unsplash.com/photo-1601924582975-7e9d39d7a7f3";
    if (name.includes("burger"))
      return "https://images.unsplash.com/photo-1550547660-d9450f859349";
    if (name.includes("chicken"))
      return "https://images.unsplash.com/photo-1604908812739-7a74c4c7b0a4";

    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836";
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Requests
      </h2>

      {requests.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-xl">📭 No requests yet</p>
          <p className="text-sm mt-2">
            Start requesting food and it will appear here
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="
                bg-white border border-gray-200 rounded-2xl overflow-hidden
                flex flex-col md:flex-row
                h-auto md:h-56
                shadow-md
                hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                transition-all duration-300 hover:scale-[1.02]
              "
            >
              {/* IMAGE (60%) */}
              <div className="w-full md:w-3/5 overflow-hidden">
                <img
                  src={getFoodImage(req.food.title)}
                  alt="food"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* CONTENT (40%) */}
              <div className="w-full md:w-2/5 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    🍱 {req.food.title}
                  </h3>

                  <p className="text-sm md:text-base text-gray-700">
                    🤝 {req.food.user.username}
                  </p>

                  <p className="text-sm md:text-base text-gray-700">
                    🏢 {req.food.user.role}
                  </p>

                  <p className="text-sm md:text-base text-gray-700">
                    📦 {req.food.quantity}
                  </p>

                  <p className="text-sm md:text-base text-gray-700 truncate">
                    📍 {req.food.location}
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`mt-2 px-3 py-1 text-sm md:text-base rounded-full w-fit ${getStatusStyle(
                    req.status
                  )}`}
                >
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NgoRequest;