import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Appointment from './pages/appointment/Appointment';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Footer from './components/Footer';
import PatientRegister from './pages/register/PatientRegister';
import ProviderRegister from './pages/register/ProviderRegister';


const Profile = () => <div className="p-4"> Profile Page </div>;


const AppWrapper: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/register' ;
    console.log("Current Path:", location.pathname);
  console.log("Is Login/Register Page:", isLoginPage);
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient" element={<PatientRegister />} />
        <Route path="/provider" element={<ProviderRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </main>
      {!isLoginPage && <Footer />}
      </div>
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