import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
const { VITE_API_URL } = import.meta.env;
import FromMessages from "./FromMessages";
import ToMessages from "./ToMessages";
import Auth from "../../hooks/Auth";
import validateInput from "../Login/validate";

function MessageBox(props: any) {
  const instance = axios.create({ baseURL: VITE_API_URL });
  const userInfo = Auth();
  const clientID = props.clientID;
  const [previousMessages, setpreviousMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [inputMessages, setinputMessages] = useState({
    message: "",
  });

  const updateValues = (e) => {
    const { name, value } = e.currentTarget;
    setinputMessages((values) => ({
      ...values,
      [name]: value,
    }));
  };
  const submitMessage = () => {
    try {
      console.log(inputMessages, "ssss");
      if (
        validateInput(inputMessages, "") != false &&
        ws &&
        ws.readyState === WebSocket.OPEN
      ) {
        console.log(inputMessages);
        ws.send(JSON.stringify(inputMessages));
        setpreviousMessages((previous) => [...previous, inputMessages]);
        setinputMessages((values) => ({
          ...values,
          message: "", // Clear the input field after sending
        }));
      } else {
        console.log("Empty Input");
      }
    } catch (err) {}
  };
  const getFriendsParams = async (authData: any, id: string) => {
    if (authData) {
      let toUserMessage: string;
      let fromUserMessage: string;
      const { data } = authData;
      const res = await instance.get("/user/getFriendsParams/" + id);
      console.log(res.data.messages);

      setpreviousMessages(res.data.messages);
      const { friend_ID, fromUser, toUser } = res.data.friendInfo;
      if (toUser == data) {
        fromUserMessage = data;
        toUserMessage = fromUser;
      } else {
        fromUserMessage = fromUser;
        toUserMessage = toUser;
      }
      setinputMessages((values) => ({
        ...values,
        touser: toUserMessage,
        fromuser: fromUserMessage,
        friendID: friend_ID,
      }));
    }
  };
  const renderMessages = (array) => {
    if (userInfo) {
      const { data } = userInfo;
      return array.map((index) => {
        if (index.fromuser == data) {
          return <ToMessages message={index.message} />;
        } else {
          return <FromMessages message={index.message} />;
        }
      });
    }
  };
  useEffect(() => {
    getFriendsParams(userInfo, clientID);
    const socket = new WebSocket("ws://localhost:3000/Inbox/t/" + clientID);
    setWs(socket);
    socket.onopen = () => {
      console.log("WebSocket Client Connected");
    };
  }, [clientID, userInfo]);
  useEffect(() => {
    if (ws) {
      const handleReceiveMessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log(previousMessages);
        setpreviousMessages((prevArray) => [...prevArray, receivedMessage]);
      };

      // Debounce the event handler to avoid multiple rapid executions
      const debouncedHandler = _.debounce(handleReceiveMessage, 1000);

      ws.addEventListener("message", debouncedHandler);

      return () => {
        // Cleanup and remove the event listener when the component unmounts
        ws.removeEventListener("message", debouncedHandler);
        ws.close();
      };
    }
  }, [ws]);
  return (
    <>
      <div id="msgHeader" className="row alignCenter">
        <p style={{ fontSize: "18px" }}>Message Center</p>
        <div className="navIcons phone" style={{ marginLeft: "auto" }}></div>
      </div>
      <div id="userMessages">{renderMessages(previousMessages)}</div>
      <div className="row">
        <input
          type="text"
          className="inputField"
          style={{ color: "black" }}
          name="message"
          onChange={updateValues}
          value={inputMessages.message}
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
