import React, { useState } from "react";
// import "./Login.css";
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

  // Track focus states
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
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
      password,
    };
    try {
      const response = await axiosInstance.post("/auth/login", payload);
      console.log("Response", response);
      const { accessToken } = response.data;
      console.log("token", accessToken);

      if (accessToken) {
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
    } catch (error) {
      console.error("Login error:", error);
      // You can handle API errors here if you want
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-[#2C253D]">
      {/* Left section */}
      <div className="flex-1 ml-80 flex flex-col justify-center items-start px-10 py-20">
        <h1 className="text-5xl font-serif font-medium">Log in to our</h1>
        <h2 className="text-5xl italic font-serif mt-2">Community.</h2>
        <p className="mt-8 text-sm">
          Not a member of the community?{" "}
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
            <div className="relative w-full mt-4">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`
                  peer w-full border-b py-2 bg-transparent placeholder-transparent focus:outline-none 
                  transition-all
                  ${emailError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#2C253D]"}
                `}
              />
              <label
                htmlFor="email"
                className={`
                  absolute left-0 text-gray-500 transition-all duration-300
                  ${emailFocused || email
                    ? "top-[-0.9rem] text-sm text-[#2C253D]"
                    : "top-2.5 text-base text-gray-400"
                  }
                `}
              >
                Email
              </label>
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            {/* Password field */}
            <div className="relative mt-10 w-full mt-4">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`
                  peer w-full border-b py-2 bg-transparent placeholder-transparent focus:outline-none transition-all
                  ${passwordError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#2C253D]"}
                `}
              />
              <label
                htmlFor="password"
                className={`
                  absolute left-0 text-gray-500 transition-all duration-300
                  ${passwordFocused || password
                    ? "top-[-0.9rem] text-sm text-[#2C253D]"
                    : "top-2.5 text-base text-gray-400"
                  }
                `}
              >
                Password
              </label>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full mt-4 bg-blue-400 text-white py-3 rounded-full shadow-md hover:bg-blue-500 transition"
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
