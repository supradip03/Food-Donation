import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../Api/axios";
import toast from "react-hot-toast";

const UpdateFood = () => {
  const { id } = useParams(); // get food id from URL
  const navigate = useNavigate();

  const [food, setFood] = useState({
    title: "",
    quantity: "",
    location: "",
    expiryTime: "",
    // status: "",
  });

  const [preview, setPreview] = useState("");

  // FETCH EXISTING FOOD (PREFILL)
  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const res = await API.get(`/food/get/${id}`);
      const data = res.data;
      console.log(data);

      setFood({
        title: data.title || "",
        quantity: data.quantity || "",
        location: data.location || "",
        expiryTime: data.expiryTime
          ? data.expiryTime.slice(0, 16) // fix datetime-local format
          : "",
        status: data.status || "AVAILABLE",
      });

      //   setPreview(data.imageUrl || "");
    } catch {
      alert("Error loading food data");
    }
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });

    if (e.target.name === "imageUrl") {
      setPreview(e.target.value);
    }
  };

  // UPDATE SUBMIT
  const handleSubmit = async (e) => {
      e.preventDefault();
  try {
    await API.put(`/food/update/${id}`, {
      ...food,
      expiryTime: food.expiryTime + ":00",
    });

    toast.success("Food Updated successfully");
    
    
    navigate("/my-food");
  } catch (err) {
    toast.error(err.response?.data || "Update failed");
  }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-linear-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Update Food</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={food.title}
            onChange={handleChange}
            placeholder="Food Name"
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="text"
            name="quantity"
            value={food.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="text"
            name="location"
            value={food.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="datetime-local"
            name="expiryTime"
            value={food.expiryTime}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="text"
            name="imageUrl"
            value={food.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          {/* <select
            name="status"
            value={food.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="REQUESTED">REQUESTED</option>
            <option value="COMPLETED">COMPLETED</option>
          </select> */}

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg 
            hover:bg-green-700 transition"
          >
            Update Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
