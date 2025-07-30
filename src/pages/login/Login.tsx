import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  const handleLogin = (e: React.FormEvent) => {
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
    login({
      email,
      role: "doctor",
      total_job_posted: 3,
      total_cand_hired: 5,
      active_job_posts: 2,
    });

    navigate("/dashboard");
  };
  return (
    <div
      style={{
        backgroundImage: "url('/loginbg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        left: "100px"
      }}
    >
      <div className="container">
        <div className="formContainer">
          <h2 className="title">Login</h2>
          <form onSubmit={handleLogin} className="form">
            <div className={`inputGroup ${emailError ? "errorBox" : ""}`}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="errorText">{emailError}</p>}
            </div>
            <div className={`inputGroup ${passwordError ? "errorBox" : ""}`}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <p className="errorText">{passwordError}</p>}
            </div>
            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
