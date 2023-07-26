import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Auth from "../hooks/Auth";
const { VITE_API_URL } = import.meta.env;

function Users() {
  const userInfo = Auth();
  const [profileInfo, setProfileInfo] = useState({});
  const [postData, setpostData] = useState([]);
  const [isFriend, setFriend] = useState({});

  const urlPath = window.location.pathname.split("/");
  const currentUser = urlPath.slice(-1)[0];
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const checkProfileURL = async (profileURL: any) => {
    if (profileURL == null) {
      return (profileURL = false);
    } else {
      return (profileURL = profileURL.split(".")[0]);
    }
  };
  const getUserData = async (username1: string, fromUser: string) => {
    const res = await instance.post("/user/user-data", {
      username: username1,
      myUser: fromUser,
    });
    console.log(res.data);
    let { username, profilepicurl, name, bio } = res.data.profileData;
    let profileURL = await checkProfileURL(profilepicurl);
    setFriend(res.data.profileData.friendStatus);
    if (profileURL == false) {
      setProfileInfo(res.data.profileData);
    } else {
      setProfileInfo({ username, profileURL, name, bio });
    }
  };
  const GetpostData = async (User: any) => {
    try {
      const userPosts = await instance.get("/post/images/" + User);
      setpostData(userPosts.data);
    } catch (err) {
      console.log(err);
    }
  };
  const addFriend = async () => {
    const { data } = userInfo;
    const res = instance.post("/user/add-user", {
      fromUser: data,
      targetUser: currentUser,
    });
  };
  const userJSX = (obj) => {
    return (
      <>
        <div id="profileHeader" className="row">
          <img
            src={
              obj.profileURL == null
                ? `/src/assets/img/defaultProfile.jpg`
                : VITE_API_URL + "/post/image/profile/" + obj?.profileURL
            }
            id="profileLarge"
          />

          <div>
            <div id="profileControls">
              <p style={{ fontSize: "25px" }}>{currentUser}</p>
              <div className="row">
                {isFriend?.status == "Accepted" ? (
                  <div
                    className="profileControlsBtn"
                    onClick={() => addFriend()}
                  >
                    Messages
                  </div>
                ) : isFriend?.status == "Pending" ? (
                  <div
                    className="profileControlsBtn"
                    onClick={() => addFriend()}
                  >
                    Requested
                  </div>
                ) : (
                  <div
                    className="profileControlsBtn"
                    onClick={() => addFriend()}
                  >
                    Add Friend
                  </div>
                )}
              </div>
            </div>
            <div id="userInfoBox">
              <p>{profileInfo?.name}</p>
              <p>{profileInfo?.bio}</p>
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
          {postData.map((index) => (
            <a href="">
              <img
                key={index.postid}
                src={`${VITE_API_URL}/post/image/post/${index?.postInfo[0].pictureurl}`}
                className="posts"
              />
            </a>
          ))}
        </div>
      </>
    );
  };
  const renderInfo = async (e: any, myUser: any) => {
    if (myUser) {
      const { data } = myUser;
      getUserData(e, data);
      GetpostData(e);
    }
  };
  useMemo(() => {
    renderInfo(currentUser, userInfo);
  }, [userInfo]);
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
          {profileInfo == false ? (
            <h1>NO USER FOUND </h1>
          ) : (
            userJSX(profileInfo)
          )}
        </div>
      </div>
    </>
  );
}
export default Users;
