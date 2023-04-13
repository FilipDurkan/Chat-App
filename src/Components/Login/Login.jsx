import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("#000000");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    onLogin(username, color);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLoginFormSubmit}>
        <div>
          <label htmlFor="username-input">Username:</label>
          <input
            type="text"
            id="username-input"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="color-input">Color:</label>
          <input
            type="color"
            id="color-input"
            value={color}
            onChange={handleColorChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
