import React, { useState } from "react";
import LoginForm from "./Components/Login/Login";
import Chat from "./Components/Chat";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("#000000");

  const handleLogin = (username, color) => {
    setUsername(username);
    setColor(color);
  };

  return (
    <div>
      {!username ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Chat username={username} color={color} />
      )}
    </div>
  );
};

export default App;
