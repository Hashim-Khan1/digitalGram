import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
const { VITE_API_URL } = import.meta.env;

function Users() {
  const [userInfo, setUserInfo] = useState();
  const urlPath = window.location.pathname.split("/");
  const currentUser = urlPath.slice(-1)[0];
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  console.log(currentUser, "path");
  const getUserData = async (username1: string) => {
    const res = await instance.post("/user/user-data", {
      username: username1,
    });
    console.log(res.data);
    setUserInfo(res.data.profileData);
  };
  useEffect(() => {
    getUserData(currentUser);
  }, []);
  return (
    <>
      <Nav />
      <div id="container">
        <div
          id="messageContainer"
          style={{
            border: "1px solid rgba(128, 128, 128, 0.123)",
            padding: "10px",
          }}
        >
          <div id="profileHeader" className="row">
            <div id="profileLarge"></div>

            <div>
              <div id="profileControls">
                <p style={{ fontSize: "25px" }}>{currentUser}</p>
                <div className="row">
                  <div className="profileControlsBtn">Following</div>
                  <div className="profileControlsBtn">Messages</div>
                </div>
              </div>
              <div id="userInfoBox">
                <p>{userInfo?.name}</p>
                <p>{userInfo?.bio}</p>
              </div>
            </div>
          </div>
          <hr
            style={{
              backgroundColor: "rgba(128, 128, 128, 0.123)",
              height: "1px",
              border: "0",
              margin: "25px 0 10px 0",
            }}
          />
          <p style={{ textAlign: "center" }}>POSTS</p>
          <div id="postsContentContainer">
            <div className="posts"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Users;
