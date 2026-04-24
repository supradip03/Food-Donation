import { useState } from "react";
import API from "../../Api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const navigate = useNavigate();

  const [food, setFood] = useState({
    title: "",
    quantity: "",
    location: "",
    expiryTime: "",
    status: "AVAILABLE",
    // imageUrl: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });

    if (e.target.name === "imageUrl") {
      setPreview(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formattedFood = {
    ...food,
    expiryTime: food.expiryTime + ":00",
  };

  try {
    await API.post("/food/addFood", formattedFood);
    toast.success("Food added successfully");
    navigate("/my-food")
  } catch {
    toast.error("Error adding food");
  }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-x-hidden flex items-center justify-center bg-linear-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add Food For Donation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            name="title"
            placeholder="Food Name"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            required
            type="text"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            required
            type="text"
            name="location"
            placeholder="Pickup Location"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            required
            type="datetime-local"
            name="expiryTime"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (optional)"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
          >
            Donate Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
