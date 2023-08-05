import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Auth from "../hooks/Auth";
import Nav from "../components/Nav";
import Users from "../components/Users";
import { Outlet } from "react-router-dom";

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
  const renderItems = (e: any) => {
    if (e) {
      const { data } = e;
      renderFriends(data);
    }
  };
  const renderFriendsList = () => {
    return friendsList.map((index) => {
      return <Users data={index} />;
    });
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
            <h1>Click on a user to start messaging </h1>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default Inbox;
