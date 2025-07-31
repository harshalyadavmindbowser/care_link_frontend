import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axios";
import { setSession } from "../../auth/utils";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleLogin =async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }
    if (!isValid) return;
    console.log("Email:", email);
    console.log("Password:", password);

   const payload = {
      email,
      password
    };
   const response =await axiosInstance.post("/auth/login", payload)
      // .then(function (response) {
        console.log("Response",response);
        const {accessToken}= response.data;
        console.log("token",accessToken);
        
        if(accessToken){
            setSession(accessToken);
        }

        navigate("/dashboard");
  login({
   
      email,
      role: "doctor",
      total_job_posted: 3,
      total_cand_hired: 5,
      active_job_posts: 2,
    });
    
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-[#2C253D]">
      {/* Left section */}
      <div className="flex-1 ml-80 flex flex-col justify-center items-start px-10 py-20">
        <h1 className="text-5xl font-serif font-medium">Log in to our</h1>
        <h2 className="text-5xl italic font-serif mt-2">Community.</h2>
        <p className="mt-8 text-sm">
          Not a member of the community?{' '}
          <a href="#" className="text-blue-700 underline">
            Join now
          </a>
        </p>
      </div>

      {/* Right section */}
      <div className="flex-1 mr-90 flex items-center justify-center px-10">
        <div className="w-full max-w-md">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email field */}
            <div>
              <label className="block text-sm font-medium mb-1">Username or Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border-b py-2 focus:outline-none ${
                  emailError
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-[#2C253D]'
                }`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border-b py-2 focus:outline-none ${
                  passwordError
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-[#2C253D]'
                }`}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#2C253D] text-white py-3 rounded-full shadow-md hover:bg-[#3b334e] transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
