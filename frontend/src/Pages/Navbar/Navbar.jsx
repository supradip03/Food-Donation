import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username") || "";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItem = (to, label) => (
    <NavLink to={to} onClick={() => setMenuOpen(false)}>
      {({ isActive }) => (
        <div
          className={`py-2 px-4 rounded-lg transition ${
            isActive
              ? "bg-green-100 text-green-600 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {label}
        </div>
      )}
    </NavLink>
  );

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)}>
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-800"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
            </div>
          </button>
        </div>

        {/* LOGO */}
        <NavLink
          to="/dashboard"
          className="text-xl font-semibold text-green-600"
        >
          🍱 FoodDonate
        </NavLink>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-6 items-center">
        {navItem("/dashboard", "Home")}

        {role === "NGO" && (
          <>
            {navItem("/foods", "Foods")}
            {navItem("/contact", "Contact")}
            {navItem("/about", "About")}
          </>
        )}

        {(role === "SELF" || role === "RESTAURANT") && (
          <>
            {navItem("/orders", "Orders")}
            {navItem("/contact", "Contact")}
            {navItem("/about", "About")}
          </>
        )}

        {navItem("/profile", "Profile")}
      </div>

      {/* 🔥 PROFILE CIRCLE */}
      <div className="relative">
        <div
          onClick={() => setProfileOpen(!profileOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-semibold cursor-pointer hover:scale-105 transition"
        >
          {username.charAt(0).toUpperCase()}
        </div>

        {/* DROPDOWN */}
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2 text-gray-700 border-b">
              {username}
            </div>

            <button
              onClick={() => {
                navigate("/profile");
                setProfileOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </button>

            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* 🔥 SIDE DRAWER */}
      {menuOpen && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* DRAWER */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col gap-2 animate-slideRight">
            
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-xl mb-4"
            >
              ✖
            </button>

            <h3 className="text-lg font-semibold mb-2">Menu</h3>

            {navItem("/dashboard", "Home")}

            {role === "NGO" && (
              <>
                {navItem("/foods", "Foods")}
                {navItem("/contact", "Contact")}
                {navItem("/about", "About")}
              </>
            )}

            {(role === "SELF" || role === "RESTAURANT") && (
              <>
                {navItem("/orders", "Orders")}
                {navItem("/contact", "Contact")}
                {navItem("/about", "About")}
              </>
            )}

            {navItem("/profile", "Profile")}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;