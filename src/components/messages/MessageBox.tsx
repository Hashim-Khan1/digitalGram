import React, { useState, useEffect, useRef, useMemo } from "react";

import FromMessages from "./FromMessages";
import ToMessages from "./ToMessages";
import { useLocation } from "react-router-dom";

function MessageBox(props: any) {
  const clientID = props.clientID;
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);
  const [inputMessages, setinputMessages] = useState({
    fromUser: "",
    toUser: "",
    friendID: "",
    userMessage: "",
  });

  const updateValues = (e) => {
    const { name, value } = e.currentTarget;
    setinputMessages((values) => ({
      ...values,
      [name]: value,
    }));
  };
  const submitMessage = () => {
    console.log(inputMessages, "User messages");
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("messageSent");
      console.log("messageSent");

      ws.send(JSON.stringify(inputMessages));
      // ws.send(); // Send the user's message
      setinputMessages((values) => ({
        ...values,
        userMessage: "", // Clear the input field after sending
      }));
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/Inbox/t/" + clientID);
    setWs(socket);
    socket.onopen = () => {
      console.log("WebSocket Client Connected");
    };
  }, [clientID]);
  return (
    <>
      <div id="msgHeader" className="row alignCenter">
        <p style={{ fontSize: "18px" }}>Username</p>
        <div className="navIcons phone" style={{ marginLeft: "auto" }}></div>
      </div>
      <div id="userMessages">
        <FromMessages />
        <ToMessages />
      </div>
      <div className="row">
        <input
          type="text"
          className="inputField"
          style={{ color: "black" }}
          name="userMessage"
          onChange={updateValues}
          value={inputMessages.userMessage}
        />
        <div
          style={{
            marginLeft: "auto",
            border: "1px solid rgba(128, 128, 128, 0.123) ",
            padding: "5px 12px",
            cursor: "pointer",
          }}
          onClick={submitMessage}
        >
          SEND
        </div>
      </div>
    </>
  );
}
export default MessageBox;
