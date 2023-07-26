import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Auth from "../hooks/Auth";
import Nav from "../components/Nav";
import Modal from "../components/Modal";

const { VITE_API_URL } = import.meta.env;

function Profile() {
  const userInfo = Auth();
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const [profileInfo, setProfileInfo] = useState({});
  const [postData, setpostData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalQuery, setmodalQuery] = useState("");
  const getUserData = async (User: any) => {
    const res = await instance.post("/user/user-data", {
      username: User,
    });
    let { username, profilepicurl, name, bio } = res.data.profileData;

    let profileURL;

    if (profilepicurl == null || profilepicurl == undefined) {
      profileURL = false;
    } else {
      profileURL = profilepicurl.split(".")[0];
    }
    setProfileInfo({ username, profileURL, name, bio });
    return username;
  };

  const changeModalStatus = (e) => {
    const { value } = e.currentTarget;
    setmodalQuery(value);
    setModalStatus((prev) => !prev);
  };
  const GetpostData = async (User: any) => {
    try {
      const userPosts = await instance.get("/post/images/" + User);
      setpostData(userPosts.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderInfo = async (e: any) => {
    if (e) {
      const { data } = e;
      getUserData(data);
      GetpostData(data);
    }
  };

  useMemo(() => {
    renderInfo(userInfo);
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
          {modalStatus != false ? <Modal modalType={modalQuery} /> : ""}
          <div id="profileHeader" className="row">
            <img
              src={
                profileInfo.profileURL == false
                  ? `/src/assets/img/defaultProfile.jpg`
                  : VITE_API_URL +
                    "/post/image/profile/" +
                    profileInfo?.profileURL
              }
              id="profileLarge"
            />
            <div>
              <div id="profileControls" className="row alignCenter">
                <p style={{ fontSize: "25px" }}>{profileInfo.username}</p>
                <button
                  className="profileControlsBtn"
                  onClick={changeModalStatus}
                  value={"Requests"}
                >
                  View Requests
                </button>
                <button
                  className="profileControlsBtn"
                  onClick={changeModalStatus}
                  value={"FriendsList"}
                >
                  View Friends
                </button>
                <a href="/settings">
                  <img
                    src={`/src/assets/img/cog.png`}
                    className="navIcons"
                    style={{ marginLeft: "10px" }}
                  />
                </a>
              </div>
              <div id="userInfoBox">
                <p>{profileInfo.name}</p>
                <p>{profileInfo.bio}</p>
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
              <a href={`/post/${index.postid}`}>
                <img
                  key={index.postid}
                  src={`${VITE_API_URL}/post/image/post/${index?.postInfo[0].pictureurl}`}
                  className="posts"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
