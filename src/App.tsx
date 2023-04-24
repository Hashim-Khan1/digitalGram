import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
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
          className="row"
          style={{ border: "1px solid rgba(128, 128, 128, 0.123)" }}
        >
          <div id="userMsgContainer">
            <div className="userBox row alignCenter">
              <div className="userProfile"></div>
              <p>Username</p>
            </div>
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
        </div>
      </div>
    </div>
  );
}

export default App;
