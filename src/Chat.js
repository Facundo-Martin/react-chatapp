import { IconButton } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import React, { useState } from "react";
import "./Chat.css";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChatName } from "./features/chatSlice";

function Chat() {
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);

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
          To: <span className="chat__name"> {chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      {/* Chat messages */}
      <div className="chat__messages">
        <Message />
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
