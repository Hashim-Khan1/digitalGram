import { useState } from "react";
import SignIn from "./Login/SignIn";
import Register from "./Login/Register";
import ResponseBox from "./ResponseBox";
function Login() {
  const [formState, setFormState] = useState("Register");
  const [formResponse, setFormResponse] = useState();
  const changeForm = (e: any) => {
    if (e.currentTarget.innerText == "Register") {
      setFormState("Login");
    } else {
      setFormState("Register");
    }
  };
  const handleResponse = (data: any) => {
    console.log(data, "yes");
    setFormResponse(data);
  };
  return (
    <>
      <div style={{ backgroundColor: "white", width: "100%", height: "100vh" }}>
        {formResponse != undefined ? (
          <ResponseBox
            message={`${formResponse?.message}`}
            status={`${formResponse?.status}`}
          />
        ) : (
          ""
        )}

        <div id="loginContainer">
          <img src="src/assets/img/logo.png" id="loginLogo" />
          {formState == "Register" ? (
            <SignIn responseData={handleResponse} />
          ) : (
            <Register responseData={handleResponse} />
          )}

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
