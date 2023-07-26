import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Auth from "../hooks/Auth";
import Nav from "../components/Nav";
import Users from "../components/Users";
import FromMessages from "../components/messages/FromMessages";
import ToMessages from "../components/messages/ToMessages";

const { VITE_API_URL } = import.meta.env;
function Inbox() {
  const userInfo = Auth();
  const [friendsList, setFriendsList] = useState([]);
  const [messages, setMessages] = useState(["1"]);

  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const renderFriends = async (username) => {
    const res = await instance.get("/user/acceptedRequests/" + username);
    console.log(res);
    setFriendsList(res.data);
  };
  const renderItems = (e) => {
    if (e) {
      const { data } = e;
      renderFriends(data);
    }
  };
  const messagesFromUsers = (e) => {
    console.log(e, "ID");
  };
  const renderFriendsList = () => {
    return friendsList.map((index) => {
      return <Users data={index} LoadData={messagesFromUsers} />;
    });
  };
  const renderMessages = () => {
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
          />
          <div
            style={{
              marginLeft: "auto",
              border: "1px solid rgba(128, 128, 128, 0.123) ",
              padding: "5px 12px",
              cursor: "pointer",
            }}
          >
            SEND
          </div>
        </div>
      </>
    );
  };
  useEffect(() => {
    renderItems(userInfo);
  }, [userInfo]);

  return (
    <>
      <Nav />
      <div id="container">
        <div
          id="messageContainer"
          className="row"
          style={{ border: "1px solid rgba(128, 128, 128, 0.123)" }}
        >
          <div id="userMsgContainer">{renderFriendsList()}</div>

          <div id="msgBody" style={{ width: "100%" }}>
            {messages.length == 0 ? (
              <h1>Click on a user to start messaging </h1>
            ) : (
              renderMessages()
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Inbox;
