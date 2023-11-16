import { useState } from "react";
import axios from "axios";
import validateInput from "./validate";
const { VITE_API_URL } = import.meta.env;

interface LoginForm {
  email: String;
  clientPassword: String;
}

function SignIn(props: any) {
  const instance = axios.create({ baseURL: VITE_API_URL });

  const [FormValues, setFormValues] = useState<LoginForm>({
    email: "",
    clientPassword: "",
  });
  const udpateValues = (e: any) => {
    const key = e.currentTarget.name;
    const name = e.currentTarget.value;
    setFormValues((values) => ({
      ...values,
      [key]: name,
    }));
  };

  const submitForm = async (e: any) => {
    try {
      const dataString = JSON.stringify(FormValues);
      console.log(validateInput(FormValues, ""));
      if (validateInput(FormValues, "") != false) {
        const res = await instance.post("/user/login", {
          data: dataString,
        });
        props.responseData(res.data);
      } else {
        props.responseData({
          message: "Blank inputs not allowed",
          status: "unsuccessful",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <input
        type="text"
        className="inputField"
        placeholder="Username or email"
        onChange={udpateValues}
        name="email"
      />
      <input
        type="text"
        className="inputField"
        placeholder="Password"
        onChange={udpateValues}
        name="clientPassword"
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
