import { Avatar, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";
// Firebase imports
import db from "./firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import * as timeago from "timeago.js";
import DeleteIcon from "@mui/icons-material/Delete";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  // Firestore Refs
  const colRef = collection(db, "chats");

  const messageRef = collection(db, "chats", `${id}`, "messages");

  useEffect(() => {
    const q = query(messageRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setChatInfo(snapshot.docs.map((doc) => doc.data()));
    });
  }, [id]);

  console.log("This is the chatName", { id });
  const deleteChat = () => {
    const docRef = doc(db, "chats", id);
    if (id !== "rnyRbNBSfNXakMuVmyXW") {
      deleteDoc(docRef);
    }
  };

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
            ? timeago.format(new Date(chatInfo[0].timestamp?.toDate()))
            : "No Messages"}
        </small>
      </div>
      <Button className="sidebarChat__delete" onClick={deleteChat}>
        <DeleteIcon style={{ color: "grey" }} />
      </Button>
    </div>
  );
}

export default SidebarChat;
