import { Avatar } from "@mui/material";
import React from "react";
import "./Message.css";

function Message({ id, content }) {
  return (
    <div className="message">
      <Avatar />
      <p>This is a message</p>
      <small>timestamp</small>
    </div>
  );
}

export default Message;
