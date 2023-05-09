import { useState } from "react";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;

function Register(props: any) {
  const [FormValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const udpateValues = (e: any) => {
    const key = e.currentTarget.name;
    const name = e.currentTarget.value;
    setFormValues((values) => ({
      ...values,
      [key]: name,
    }));
  };
  const instance = axios.create({ baseURL: VITE_API_URL });
  const submitForm = async (e: any) => {
    const dataString = JSON.stringify(FormValues);
    console.log(dataString);

    const res = await instance.post("/user/create-user", {
      data: dataString,
    });
    props.responseData(res.data);
  };
  return (
    <>
      <input
        type="text"
        className="inputField"
        placeholder="Name"
        onChange={udpateValues}
        name="name"
      />
      <input
        type="text"
        className="inputField"
        placeholder="Username"
        onChange={udpateValues}
        name="username"
      />
      <input
        type="text"
        className="inputField"
        placeholder="Email"
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
export default Register;
