import { useState } from "react";
import axios from "axios";
import validateInput from "./validate";

const { VITE_API_URL } = import.meta.env;
interface RegisterForm {
  email: String;
  password: String;
  username: String;
  name: String;
}
function Register(props: any) {
  const [FormValues, setFormValues] = useState<RegisterForm>({
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
    try {
      if (validateInput(FormValues, "") != false) {
        const dataString = JSON.stringify(FormValues);

        const res = await instance.post("/user/create-user", {
          data: dataString,
        });
        props.responseData(res.data);
      } else {
        props.responseData({
          message: "Blank inputs not allowed",
          status: "unsuccessful",
        });
      }
    } catch (err) {}
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
