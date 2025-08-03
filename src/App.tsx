import React from "react";
import {
  
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Appointment from "./pages/appointment/Appointment";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Footer from "./components/Footer";
import Register from "./pages/register/Register";
import HospitalDetails from "./pages/hospitaldetails/HospitalDetails";
import MapPage from "./pages/map/map";
import Profile from "./pages/profile/Profile";
import PrivateRoute from "./routes/PrivateRoute";

const AppWrapper: React.FC = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/register";

  console.log("Current Path:", location.pathname);
  console.log("Is Login/Register Page:", isLoginPage);

  return (
    <div className="flex bg-white-500 flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow overflow-y-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/patient" element={<Register />} />
          <Route path="/provider" element={<Register />} />

          {/* <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}
          <Route path="/dashboard" element={<PrivateRoute defineRole={['provider', 'patient']}><Dashboard /></PrivateRoute>} />
          <Route path="/hospitaldetails" element={<HospitalDetails />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </main>

      {!isLoginPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
      <AppWrapper />

  );
};

export default App;
