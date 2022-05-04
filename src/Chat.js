import { IconButton } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import React, { useState } from "react";
import "./Chat.css";

function Chat() {
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();

    // Firebase
    setInput("");
  };
  return (
    <div className="chat">
      {/* Chat header */}
      <div className="chat__header">
        <h4>
          To: <span className="chat__name"> Channel Name</span>
        </h4>
        <strong>Details</strong>
      </div>
      {/* Chat messages */}
      <div className="chat__messages">
        <h2>I am a message</h2>
        <h2>I am a message</h2>
        <h2>I am a message</h2>
        <h2>I am a message</h2>
        <h2>I am a message</h2>
      </div>
      {/* Chat input */}
      <div className="chat__input">
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your Message"
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;