import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const email = user?.email || "";
  const avatarLetter = email.charAt(0).toUpperCase() || "U";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const navLinkClass = (path: string) =>
  `relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#2C253D] after:transition-all after:duration-800 after:w-0 hover:after:w-full ${
    location.pathname === path ? "after:w-full" : ""
  }`;


  return (
    <nav className="flex items-center ml-60 mt-5 w-full text-black bg-white fixed top-0 left-0 z-50 px-6 h-16">
      <div className="flex justify-between items-center w-full">
        <div className="text-xl font-bold">
  <Link to="/">
    <img
      src="/logo.png" 
      alt="CareLink Logo"
      className="h-20 mt-4 ml-4 w-auto" 
    />
  </Link>
</div>


        {/* Right section */}
        <div className="flex mt-6 mr-150 items-center space-x-6 ml-auto">
          {!isAuthenticated ? (
            <>
              <Link to="/patient" className={navLinkClass("/patient")}>
                For Patients
              </Link>
              <Link to="/provider" className={navLinkClass("/provider")}>
                For Providers
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={navLinkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/appointments" className={navLinkClass("/appointments")}>
                Appointments
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-white text-cyan-700 flex items-center justify-center font-semibold">
                    {avatarLetter}
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 text-black z-50">
                    <button
                      onClick={handleProfileClick}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
