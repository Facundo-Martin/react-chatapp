import React from "react";
import "./imessage.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function Imessage() {
  return (
    <div className="imessage">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat */}
      <Chat />
    </div>
  );
}

export default Imessage;
