import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import PropertyDetails from "./pages/PropertyDetails";
import CreateProperty from "./pages/CreateProperty";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import MyBookings from "./pages/MyBookings";
import HostDashboard from "./pages/HostDashboard";
import EditProperty from "./pages/EditProperty";


function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-[#FAFAF8]">

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/explore"
            element={<Explore />}
          />

          <Route
            path="/property/:id"
            element={<PropertyDetails />}
          />

          <Route
            path="/create-property"
            element={<CreateProperty />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
              path="/wishlist"
              element={<Wishlist />}
          />

          <Route
             path="/my-bookings"
              element={<MyBookings />}
            />

            <Route
             path="/host-dashboard"
             element={<HostDashboard />}
            />

            <Route
  path="/edit-property/:id"
  element={<EditProperty />}
/>

        </Routes>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;