import { useState } from "react";

function SignIn() {
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
    </>
  );
}
export default SignIn;
