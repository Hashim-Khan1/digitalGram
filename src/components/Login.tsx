import { useState, useRef } from "react";
import SignIn from "./Login/SignIn";
import Register from "./Login/Register";
function Login() {
  const [formState, setFormState] = useState("Register");
  const changeForm = (e: any) => {
    if (e.currentTarget.innerText == "Register") {
      setFormState("Login");
    } else {
      setFormState("Register");
    }
  };
  return (
    <>
      <div style={{ backgroundColor: "white", width: "100%", height: "100vh" }}>
        <div id="loginContainer">
          <img src="src/assets/img/logo.png" id="loginLogo" />
          {formState == "Register" ? <SignIn /> : <Register />}

          <div
            className="row alignCenter"
            style={{ width: "100%", margin: "10px 0" }}
          >
            <div className="lineSeperator"></div>
            <p style={{ width: "max-content" }}>OR</p>
            <div className="lineSeperator"></div>
          </div>
          <p style={{ cursor: "pointer" }} onClick={changeForm}>
            <b>{formState}</b>
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;
