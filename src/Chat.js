import { IconButton } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName } from "./features/chatSlice";
import { selectUser } from "./features/userSlice";
// Database imports
import db from "./firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { query, orderBy, serverTimestamp } from "firebase/firestore";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);

  // Collection Ref
  // The chatId is coming from Redux and it's set in the SidebarChat comopnent (onClick)
  const messageRef = collection(db, "chats", `${chatId}`, "messages");
  console.log("these are my messages", { messages });

  // Getting Docs, no real-time updates
  // useEffect(() => {
  //   getDocs(messageRef).then((snapshot) => {
  //     setMessages(
  //       snapshot.docs.map((doc) => ({
  //         data: doc.data(),
  //         id: doc.id,
  //       }))
  //     );
  //   });
  // }, []);

  // onSnapshot
  useEffect(() => {
    if (chatId) {
      const q = query(messageRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [chatId]);

  // Firebase code before v9
  // useEffect(() => {
  //   if (chatId) {
  //     db.collection("chats")
  //       .doc(chatId)
  //       .collection("messages")
  //       .orderBy("timestamp", "desc")
  //       .onSnapshot((snapshot) =>
  //         setMessages(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             data: doc.data(),
  //           }))
  //         )
  //       );
  //   }
  // }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    // db.collection("chats").doc(chatId).collection("messages").add({
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   message: input,
    //   uid: user.uid,
    //   photo: user.photo,
    //   email: user.email,
    //   displayName: user.displayName,
    // });
    console.log("this is my input:", { input });
    addDoc(messageRef, {
      timestamp: serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
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
        {messages.map(({ id, data }) => (
          <Message key={id} contents={data} />
        ))}
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
