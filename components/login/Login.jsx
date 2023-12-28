import React from "react";
import axios from "axios";
import { useState } from "react";
import "./login.css";
import { useRouter } from "next/router";
import axiosInstance from '../../axiosInstance'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter()

  const handleUser = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      router.push("/movies")
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  
  // Clear the error when the user starts typing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null); // Clear the error when the email changes
  };

   // Clear the error when the user starts typing
   const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null); 
  };

  return (
    <div className="container-fluid maindiv">
      <div className="loginbox">
        <h1 className="title">Sign in</h1>
        <div>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="input-box"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="input-box"
          />
        </div>
        <div className="remeber">
          <input type="checkbox" />
          <label htmlFor="vehicle1">Remember me</label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div>
          <button type="button" className="submitbutton" onClick={handleUser}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
