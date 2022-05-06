import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SidebarChat from "./SidebarChat";
// Redux imports
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
// Authentication import
import { auth } from "./firebase";
// Database importsS
import db from "./firebase";
import { addDoc } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  // Collection ref
  const colRef = collection(db, "chats");

  // Getting Docs from db, but no updates!

  // useEffect(() => {
  //   getDocs(colRef).then((snapshot) => {
  //     setChats(
  //       snapshot.docs.map((doc) => ({
  //         data: doc.data(),
  //         id: doc.id,
  //       }))
  //     );
  //     console.log("hi");
  //   });
  // }, []);
  // Adding chats to our db

  // Adding a real-time listener to our database so when we make changes we retrieve the updated snapshot and re-render --> onSnapshot
  onSnapshot(colRef, (snapshot) => {
    setChats(
      snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }))
    );
  });

  const addChat = () => {
    const chatName = prompt("Please enter a chat name");

    if (chatName) {
      addDoc(colRef, {
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search" />
        </div>

        <IconButton
          onClick={addChat}
          variant="outlined"
          className="sidebar__inputButton"
        >
          <RateReviewIcon />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats?.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
