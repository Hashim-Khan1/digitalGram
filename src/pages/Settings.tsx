import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Auth from "../hooks/Auth";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;
export default function SettingsPage() {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const userInfo = Auth();
  const [formDetails, setFormDetails] = useState({
    username: "",
    name: "",
    bio: "",
    email: "",
  });
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    console.log(formDetails);
  };
  const getUserData = async (User) => {
    const { data } = User;
    const res = await instance.post("/user/user-data", {
      username: data,
    });
    setFormDetails(res.data.profileData);
    if (res.data.profileData.bio == null) {
      setFormDetails((prevState) => ({
        ...prevState,
        bio: "",
      }));
    }

    console.log(res.data.profileData);
  };
  useEffect(() => {
    if (userInfo) {
      getUserData(userInfo);
    }
  }, [userInfo]);

  return (
    <>
      <Nav />
      <div id="container">
        <div
          id="messageContainer"
          style={{
            border: "1px solid rgba(128, 128, 128, 0.123)",
            padding: "10px",
          }}
        >
          <div id="profileHeader" className="row">
            <div id="profileLarge"></div>

            <div>
              <div id="profileControls">
                <p style={{ fontSize: "25px" }}>
                  {formDetails?.username} : Username
                </p>
              </div>
              <div id="userInfoBox">
                <input
                  type="text"
                  placeholder="Username"
                  className="searchInpt"
                  style={{
                    border: "2px solid rgba(128, 128, 128, 0.123)",
                    width: "100%",
                    margin: "10px 0",
                  }}
                  name="username"
                  value={formDetails?.username}
                  onChange={handleOnChange}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="searchInpt"
                  style={{
                    border: "2px solid rgba(128, 128, 128, 0.123)",
                    width: "100%",
                    margin: "10px 0",
                  }}
                  name="email"
                  value={formDetails?.email}
                  onChange={handleOnChange}
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="searchInpt"
                  style={{
                    border: "2px solid rgba(128, 128, 128, 0.123)",
                    width: "100%",
                    margin: "10px 0",
                  }}
                  name="name"
                  value={formDetails?.name}
                  onChange={handleOnChange}
                />
                <textarea
                  style={{
                    border: "2px solid rgba(128, 128, 128, 0.123)",
                    width: "100%",
                    margin: "10px 0",
                  }}
                  id="captionInput"
                  name="bio"
                  className="searchInpt"
                  placeholder="Add caption max 350 characters"
                  maxLength={350}
                  value={formDetails?.bio}
                  onChange={handleOnChange}
                ></textarea>
                <input
                  type="submit"
                  value="Update"
                  className="submitDark"
                  onClick={handleSubmit}
                  style={{ margin: "10px 0" }}
                />
                <p>
                  Edit your user profile here, once happy with what you have put
                  in, save it!
                </p>
              </div>
            </div>
          </div>
          <hr
            style={{
              backgroundColor: "rgba(128, 128, 128, 0.123)",
              height: "1px",
              border: "0",
              margin: "25px 0 10px 0",
            }}
          />
        </div>
      </div>
    </>
  );
}
