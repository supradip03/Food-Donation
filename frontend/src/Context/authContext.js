import { jwtDecode } from "jwt-decode";

// Check token validity
export const isTokenValid = () => {
  const token = localStorage.getItem("token");

  if (!token || token === "null" || token === "undefined") {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime; // not expired
  } catch {
    return false;
  }
};

//  Get role
export const getRole = () => {
  return localStorage.getItem("role");
};