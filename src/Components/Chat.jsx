import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Chat.css";

const Chat = ({ username, color }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const droneRef = useRef(null);

  useEffect(() => {
    const drone = new window.Scaledrone("UvfIxrEZf0elUqe2");

    drone.on("open", (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Successfully connected to Scaledrone");
      }
    });

    droneRef.current = drone;

    const room = drone.subscribe("observable-room");

    room.on("data", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      drone.unsubscribe("observable-room");
      drone.close();
    };
  }, []);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = {
      color,
      username,
      message,
    };

    droneRef.current.publish({
      room: "observable-room",
      message: messageData,
    });

    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Space Chat</h2>
        <div className="user-info">
          <span className="username">{username}</span>
          <div className="user-color" style={{ backgroundColor: color }}></div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.username === username ? "chat-message-right" : ""
            }`}
          >
            <div className="message-info">
              <div
                className="user-color"
                style={{ backgroundColor: message.color }}
              ></div>
              <div className="chat-message-content">
                <div className="username">{message.username}</div>
                <div className="message-text">{message.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit" className="chat-send-button">
          Send
        </button>
      </form>
    </div>
  );
};

Chat.propTypes = {
  username: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Chat;
