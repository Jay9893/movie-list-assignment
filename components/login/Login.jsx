import React from "react";
import axios from "axios";
import { useState } from "react";
import "./login.css";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleUser = async () => {
    try {
      const response = await axios.post("/api/user", {
        email,
        password,
      });
      router.push("/movies")
    } catch (error) {
      console.error("Error creating User:", error.message);
      // handle errors or show an error message
    }
  };

  return (
    <div className="container-fluid maindiv">
      <div className="loginbox">
        <h1 className="title">Sign in</h1>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-box"
          />
        </div>
        <div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-box"
          />
        </div>
        <div className="remeber">
          <input type="checkbox" />
          <label htmlFor="vehicle1">Remember me</label>
        </div>
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
