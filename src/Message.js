import React from "react";
import "./Message.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Message({
  id,
  contents: { timestamp, displayName, email, message, photo, uid },
}) {
  const user = useSelector(selectUser);
  return (
    <div className={`message ${user.email === email && "message__sender"}`}>
      <Avatar className="message__photo" src={photo} />
      <p>{message}</p>
      <small>
        {timestamp
          ?.toDate()
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </small>
    </div>
  );
}

export default Message;
