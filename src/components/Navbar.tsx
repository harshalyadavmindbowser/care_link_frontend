import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const email = user?.email || "";
  const avatarLetter = email.charAt(0).toUpperCase() || "U";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  return (
    <nav className="w-full bg-blue-400 text-white shadow fixed top-0 left-0 z-50">
      <div className="ml-20 mr-20">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold">
            <Link to="/">CareLink</Link>
          </div>
          <div className="flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="hover:text-gray-200">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-200">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-gray-200">
                  Dashboard
                </Link>
                <Link to="/appointments" className="hover:text-gray-200">
                  Appointments
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-semibold">
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
      </div>
    </nav>
  );
};

export default Navbar;
