import { useState } from "react";
import Auth from "../hooks/Auth";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import ResponseBox from "./ResponseBox";

function Nav() {
  Auth();
  const navigate = useNavigate();
  const navItems = ["Home", "Search", "Create", "Messages", "Profile"];
  const [modalStatus, setModalStatus] = useState(false);
  const [modalTypeInfo, setmodalType] = useState("");
  const [formResponse, setFormResponse] = useState(false);

  const checkStatus = (
    currentItem: string,
    checkItem: string,
    modalStatus: boolean
  ) => {
    if (currentItem != checkItem || modalStatus == false) {
      setModalStatus((prev) => !prev);
    }
  };

  const handleClick = (item: string) => {
    setmodalType(item);
    switch (item) {
      case "Home":
        setModalStatus(false);
        navigate("/home");
        break;
      case "Search":
        checkStatus(modalTypeInfo, "Create", modalStatus);
        break;
      case "Create":
        checkStatus(modalTypeInfo, "Search", modalStatus);
        break;
      case "Messages":
        setModalStatus(false);
        navigate("/Inbox");
        break;
      case "Profile":
        setModalStatus(false);
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
  const handleModalResponse = (data: any) => {
    console.log(data);
    setFormResponse(data);
    setTimeout(() => {
      setFormResponse(false);
      setModalStatus(false);
    }, 2000);
  };
  return (
    <>
      {formResponse != false ? (
        <ResponseBox
          message={`${formResponse?.message}`}
          status={`${formResponse?.status}`}
        />
      ) : (
        ""
      )}
      {modalStatus != false ? (
        <Modal modalType={modalTypeInfo} modalResponse={handleModalResponse} />
      ) : (
        ""
      )}
      <nav>
        <div className="navLogo"></div>
        <ul>{renderNavItems(navItems)}</ul>
      </nav>
    </>
  );
}
export default Nav;
