import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        🚫 Not logged in
      </div>
    );
  }

  const decoded = jwtDecode(token);

  const getInitial = () => {
    return decoded.username ? decoded.username.charAt(0).toUpperCase() : "U";
  };

  const getRoleColor = () => {
    switch (decoded.role) {
      case "NGO":
        return "bg-green-100 text-green-700";
      case "RESTAURANT":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br flex justify-center items-center bg-gray-50 p-6">
      
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md text-center
        hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition">

        {/* PROFILE CIRCLE */}
        <div className="w-20 h-20 mx-auto rounded-full bg-green-500 text-white flex items-center justify-center text-3xl font-bold mb-4">
          {getInitial()}
        </div>

        <h2 className="text-2xl font-semibold mb-1">
          {decoded.username}
        </h2>

        <p className="text-gray-500 mb-3">
          {decoded.sub}
        </p>

        {/* ROLE BADGE */}
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${getRoleColor()}`}
        >
          {decoded.role}
        </span>

        {/* DETAILS */}
        <div className="mt-6 text-left space-y-2 text-gray-700">
          <p><b>👤 Username:</b> {decoded.username}</p>
          <p><b>📧 Email:</b> {decoded.sub}</p>
          <p><b>🏷 Role:</b> {decoded.role}</p>
        </div>

        {/* OPTIONAL TOKEN INFO */}
        {/* 
        <p className="text-xs text-gray-400 mt-4">
          Expires: {new Date(decoded.exp * 1000).toLocaleString()}
        </p> 
        */}
      </div>
    </div>
  );
};

export default Profile;