import { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../hooks/Auth";
import Nav from "../components/Nav";
import Users from "../components/Users";
import { Outlet, useNavigate } from "react-router-dom";
import MessageAuth from "../hooks/MessageAuth";

const { VITE_API_URL } = import.meta.env;
function Inbox() {
  const navigate = useNavigate();
  const userInfo = Auth();
  const [friendsList, setFriendsList] = useState([]);
  const [messageAuth, setmmessageAuth] = useState(false);

  const url = window.location.pathname;
  const pathName = url.split("/");

  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const renderFriends = async (username: string) => {
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
  useEffect(() => {
    const fetchMessage = async () => {
      if (pathName.length > 3 && userInfo) {
        const { data } = userInfo;
        const friendID = pathName.pop();

        const messageAuth = MessageAuth(data, friendID);
        let messageResult = await messageAuth.checkAuth();
        setmmessageAuth(messageResult);
        if (messageResult == false) navigate("");
      }
    };
    fetchMessage();
  }, [pathName]);
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
            {messageAuth == false ? (
              <h1>Click on a user to start messaging </h1>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Inbox;
