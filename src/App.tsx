import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
function App() {
  const [count, setCount] = useState(0);

  const navItems = ["Home", "Messages", "Profile"];

  const renderNavItems = (navItems: any) => {
    return navItems.map((el: string) => {
      return (
        <a>
          <li key={el}>
            <img src={`/src/assets/img/${el}.png`} className="navIcons" />
            <p>{el}</p>
          </li>
        </a>
      );
    });
  };
  return (
    <div className="App">
      {/* <Login></Login> */}

      <nav>
        <div className="navLogo"></div>
        <ul>{renderNavItems(navItems)}</ul>
      </nav>
    </div>
  );
}

export default App;
