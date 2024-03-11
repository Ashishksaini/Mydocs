import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './Login.css'
import  l from '../images/LoginPage.svg'
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    setIsSignUp(true); 
  };

  const handleLogin = () => {
    setIsSignUp(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Handle sign-up form submission
      // You can add your sign-up logic here
      console.log("Sign Up:", { name, email, password, confirmPassword });
    } else {
      // Handle login form submission
      // You can add your login logic here
      console.log("Login:", { email, password });
    }
  };

  return (
    <div className="parent-form-container">
      <Navbar />
      <div className="form-container-wrapper">
        <div className="form-container">
          <h2 className="form-heading">
            {isSignUp ? "Sign Up" : "User Login"}
          </h2>
          <p style={{ color: "grey" }}>
            {!isSignUp
              ? "Enter the account details to Sign in"
              : "Ready to start your journey with MyDocs 👋"}
          </p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                className="text-input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              className="text-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <input
                className="text-input"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <button className="submit-button" type="submit">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          {!isSignUp ? (
            <p>
              Don't have an account?{" "}
              <button className="toggle-button" onClick={handleSignUp}>
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button className="toggle-button" onClick={handleLogin}>
                Login
              </button>
            </p>
          )}
        </div>
        <div class="vertical-line"></div>
        <img src={l} alt="LoginVector" className="loginimg" />
      </div>
    </div>
  );
};

export default Login;
