import { useEffect, useState } from "react";
import API from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyFoods = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyFoods();
  }, []);

  const fetchMyFoods = async () => {
    try {
      const res = await API.get("/food/userFoods");
      setFoods(res.data);
    } catch {
      console.log("Error fetching my foods");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/food/remove/${id}`);
      toast.delete("Food Deleted Successfully");
      fetchMyFoods();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-food/${id}`);
  };

  const handleAddFood = () => {
    navigate("/add-food");
  };
  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-green-50 via-white to-blue-50 p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">My Food Donations</h2>

      {foods.length === 0 ? (
        <button
          onClick={handleAddFood}
          className="flex-1 bg-green-500 text-white py-1.5 px-3 rounded-md text-sm 
                  hover:bg-green-600 transition"
        >
          Donate Food
        </button>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {foods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <img
                src={food.imageUrl || "https://via.placeholder.com/300"}
                className="w-full h-40 object-cover"
              />

              <div className="p-3 space-y-1">
                <h3 className="text-md font-semibold">{food.title}</h3>

                <p className="text-xs text-gray-600">Qty: {food.quantity}</p>

                <p className="text-xs text-gray-600">{food.location}</p>

                {/* ACTION BUTTONS (SAME ROW) */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleUpdate(food.id)}
                    className="flex-1 bg-blue-500 text-white py-1.5 rounded-md text-sm 
                  hover:bg-blue-600 transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(food.id)}
                    className="flex-1 bg-red-500 text-white py-1.5 rounded-md text-sm 
                  hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFoods;
