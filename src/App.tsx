import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import Users from "./components/Users";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <Login></Login> */}
      <Nav />
      <div id="container">
        <div className="mainBody">
          <div id="searchContainer">
            <input
              type="text"
              className="searchInpt"
              placeholder="Search Username"
            />
            <div id="search"></div>
          </div>
          {/* <Posts /> */}
        </div>
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
                <p style={{ fontSize: "25px" }}>Username</p>
                <div className="row">
                  <div className="profileControlsBtn">Following</div>
                  <div className="profileControlsBtn">Messages</div>
                </div>
              </div>
              <div id="userInfoBox">
                <p>Name</p>
                <p>
                  Bio Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  In, amet?
                </p>
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
            <div className="posts"></div>
            <div className="posts"></div>
            <div className="posts"></div>
          </div>
        </div>
        {/* 
        Inbox Page
        <div
          id="messageContainer"
          className="row"
          style={{ border: "1px solid rgba(128, 128, 128, 0.123)" }}
        >
          <div id="userMsgContainer">
            <Users />
          </div>
          <div id="msgBody" style={{ width: "100%" }}>
            <div id="msgHeader" className="row alignCenter">
              <p style={{ fontSize: "18px" }}>Username</p>
              <div
                className="navIcons phone"
                style={{ marginLeft: "auto" }}
              ></div>
            </div>
            <div id="userMessages">
              <div className="userMsg myMsg">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Numquam tempora a, ad aspernatur officiis facilis.
              </div>
              <div className="userMsg toMsg">Lorem ipsum dolor sit amet.</div>
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
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
