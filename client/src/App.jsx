import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProperty from "./pages/CreateProperty";


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
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
             path="/create-property"
              element={<CreateProperty />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;