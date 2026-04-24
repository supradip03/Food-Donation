import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api/axios";
import { isTokenValid } from "../../Context/authContext";
import toast from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
    role: "NGO",
  });

  const navigate = useNavigate();

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    if (isTokenValid()) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user/register", data);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <input
          type="text"
          placeholder="Mobile"
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setData({ ...data, mobile: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setData({ ...data, location: e.target.value })}
        />

        <select
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="NGO">NGO</option>
          <option value="SELF">SELF</option>
          <option value="RESTAURANT">RESTAURANT</option>
        </select>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition">
          Register
        </button>

        {/* 🔁 Switch to Login */}
        <p className="text-center text-sm mt-2">
          Already a user?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
