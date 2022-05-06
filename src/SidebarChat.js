import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
      className="sidebarChat"
    >
      <Avatar />
      <div className="sidebarChat__info">
        <h3> {chatName}</h3>
        <p>Last Message sent...</p>
        <small>timestamp</small>
      </div>
    </div>
  );
}

export default SidebarChat;
