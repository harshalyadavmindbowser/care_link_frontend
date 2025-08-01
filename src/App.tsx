import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Appointment from './pages/appointment/Appointment';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Footer from './components/Footer';
import PatientRegister from './pages/register/PatientRegister';
import ProviderRegister from './pages/register/ProviderRegister';
import HospitalDetails from './pages/hospitaldetails/HospitalDetails';
import MapPage from './pages/map/map';
import Profile from './pages/profile/Profile';


const AppWrapper: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/register';

  console.log("Current Path:", location.pathname);
  console.log("Is Login/Register Page:", isLoginPage);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow overflow-y-auto px-6 py-8 bg-gray-50">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/patient" element={<PatientRegister />} />
          <Route path="/provider" element={<ProviderRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hospitaldetails" element={<HospitalDetails />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/map' element={<MapPage />} />

        </Routes>
      </main>

      {!isLoginPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
