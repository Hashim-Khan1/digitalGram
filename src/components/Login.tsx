import { useState } from "react";
function Login() {
  const [FormValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const udpateValues = (e: any) => {
    const key = e.currentTarget.name;
    const name = e.currentTarget.value;
    setFormValues((values) => ({
      ...values,
      [key]: name,
    }));
  };
  const submitForm = (e: any) => {
    console.log(FormValues);
  };
  return (
    <>
      <div style={{ backgroundColor: "white", width: "100%", height: "100vh" }}>
        <div id="loginContainer">
          <img src="src/assets/img/logo.png" id="loginLogo" />
          <input
            type="text"
            className="inputField"
            placeholder="Username"
            onChange={udpateValues}
            name="email"
          />
          <input
            type="text"
            className="inputField"
            placeholder="Password"
            onChange={udpateValues}
            name="password"
          />
          <input
            type="submit"
            className="sbtn"
            style={{ marginTop: "10px" }}
            onClick={submitForm}
          />
          <div
            className="row alignCenter"
            style={{ width: "100%", margin: "10px 0" }}
          >
            <div className="lineSeperator"></div>
            <p style={{ width: "max-content" }}>OR</p>
            <div className="lineSeperator"></div>
          </div>
          <p>
            <b>Register</b>
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;
