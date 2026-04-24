import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import{Toaster} from "react-hot-toast"

import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddFood from "./Pages/Foods/AddFood";
import FoodList from "./Pages/Foods/FoodList";
import NgoRequest from "./Pages/Requests/NgoRequest";
import FoodRequests from "./Pages/Requests/FoodRequests";
import Profile from "./Pages/User/Profile";

import ProtectedRoute from "./Pages/Routes/ProtectedRoute";
import AuthLayout from "./Pages/Layouts/AuthLayout";
import MainLayout from "./Pages/Layouts/MainLayout";
import PublicRoute from "./Pages/Routes/PublicRoutes";
import MyFoods from "./Pages/Foods/MyFoods";
import UpdateFood from "./Pages/Foods/UpdateFood";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import OrderedFood from "./Pages/Foods/OrderedFood";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["NGO", "SELF", "RESTAURANT"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/foods" element={<FoodList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/my-food" element={<MyFoods />} />
          <Route path="/update-food/:id" element={<UpdateFood />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/orders" element={<OrderedFood />} />

          <Route
            path="/my-requests"
            element={
              <ProtectedRoute allowedRoles={["NGO"]}>
                <NgoRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/food-requests"
            element={
              <ProtectedRoute allowedRoles={["SELF", "RESTAURANT"]}>
                <FoodRequests />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
