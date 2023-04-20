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
      </div>
    </div>
  );
}

export default App;
