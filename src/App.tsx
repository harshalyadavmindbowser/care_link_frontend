import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Appointment from './pages/appointment/appointment';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/patientDashboard';
import Footer from './components/Footer';
const Profile = () => <div className="p-4">Profile Page</div>;
const AppWrapper: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
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