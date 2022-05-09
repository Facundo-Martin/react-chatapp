import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";
// Firebase imports
import db from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  // Firestore Ref
  const messageRef = collection(db, "chats", `${id}`, "messages");

  useEffect(() => {
    const q = query(messageRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setChatInfo(snapshot.docs.map((doc) => doc.data()));
    });
  }, [id]);

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
      <Avatar src={chatInfo[0]?.photo} />
      <div className="sidebarChat__info">
        <h3> {chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {chatInfo[0]
            ? new Date(chatInfo[0].timestamp?.toDate()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "No Message"}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
