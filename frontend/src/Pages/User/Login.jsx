import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api/axios";
import { jwtDecode } from "jwt-decode";
import { isTokenValid } from "../../Context/authContext";
import toast from "react-hot-toast";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    if (isTokenValid()) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.clear();

    try {
      const res = await API.post("/user/login", data);
      const token = res.data;

      localStorage.setItem("token", token);
      
      const decoded = jwtDecode(token);
      localStorage.setItem("username", decoded.username);
      
      localStorage.setItem("role", decoded.role);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition">
          Login
        </button>

        {/* 🔁 Switch to Register */}
        <p className="text-center text-sm mt-2">
          New user?{" "}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
