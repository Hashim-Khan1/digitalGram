import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div id="loginContainer">
        <img src="src/assets/img/logo.png" id="loginLogo" />
        <input type="text" className="inputField" placeholder="Username" />
        <input type="text" className="inputField" placeholder="Password" />
        <input type="submit" className="sbtn" style={{ marginTop: "10px" }} />
        <div
          className="row alignCenter"
          style={{ width: "100%", margin: "10px 0" }}
        >
          <div className="lineSeperator"></div>
          <p style={{ width: "max-content" }}>OR</p>
          <div className="lineSeperator"></div>
        </div>
        <p>Sign in with Google</p>
      </div>
    </div>
  );
}

export default App;
