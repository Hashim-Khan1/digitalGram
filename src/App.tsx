import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
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
          <div className="postContainer">
            <div
              className="row"
              style={{ alignItems: "center", marginBottom: "10px" }}
            >
              <div className="profileImg"></div>
              <p>USERNAME</p>
              <p>7ds</p>
            </div>
            <div className="postImg"></div>
            <div
              className="row"
              style={{ alignItems: "center", margin: "10px 0" }}
            >
              <div className="postIcons heart"></div>
              <div className="postIcons comment"></div>
              <div className="postIcons send"></div>
            </div>
            <p>111,000 likes</p>
            <p>
              {" "}
              <b>Uername</b> Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Perspiciatis autem quis dolore molestiae, minima quia
              veritatis impedit facilis! Neque, eos.{" "}
            </p>
            <p className="greyText">View all comments 115 </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
