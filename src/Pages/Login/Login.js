import React, { useState } from "react";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "noy" && password === "123") {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label className="label-username" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="input-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label-password" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
