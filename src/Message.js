import { Avatar } from "@mui/material";
import React from "react";
import "./Message.css";

function Message({
  id,
  contents: { timestamp, displayName, email, message, photo, uid },
}) {
  return (
    <div className="message">
      <Avatar src={photo} />
      <p>{message}</p>
      <small>{timestamp?.toDate().toLocaleTimeString()}</small>
    </div>
  );
}

export default Message;
