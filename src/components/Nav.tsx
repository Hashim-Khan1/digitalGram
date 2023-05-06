import { useState } from "react";
import Auth from "../hooks/Auth";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function Nav() {
  Auth();
  const navigate = useNavigate();
  const navItems = ["Home", "Search", "Create", "Messages", "Profile"];
  const [modalStatus, setModalStatus] = useState(false);
  const [modalTypeInfo, setmodalType] = useState("");

  const checkStatus = (currentItem: string, checkItem: string) => {
    if (currentItem != checkItem) {
      setModalStatus((prev) => !prev);
    }
  };

  const handleClick = (item: string) => {
    console.log(modalStatus);
    setmodalType(item);
    switch (item) {
      case "Home":
        navigate("/home");
        setModalStatus(false);
        break;
      case "Search":
        checkStatus(modalTypeInfo, "Create");
        break;
      case "Create":
        checkStatus(modalTypeInfo, "Search");
        break;
      case "Messages":
        navigate("/Inbox");
        break;
      case "Profile":
        navigate("/Profile");
        break;
    }
  };
  const renderNavItems = (navItems: any) => {
    return navItems.map((el: string) => {
      return (
        <a>
          <li key={el} onClick={() => handleClick(el)}>
            <img src={`/src/assets/img/${el}.png`} className="navIcons" />
            <p>{el}</p>
          </li>
        </a>
      );
    });
  };
  return (
    <>
      {modalStatus != false ? <Modal modalType={modalTypeInfo} /> : ""}
      <nav>
        <div className="navLogo"></div>
        <ul>{renderNavItems(navItems)}</ul>
      </nav>
    </>
  );
}
export default Nav;
