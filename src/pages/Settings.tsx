import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Auth from "../hooks/Auth";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;
export default function SettingsPage() {
  const navigate = useNavigate();
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
  const [clicked, setClicked] = useState(false);
  const [err, setErr] = useState({});
  const [successMsg, setSuccessMsg] = useState({});
  const [imageSrc, setImageSrc] = useState("");

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const { data } = userInfo;
    const formData = { ...formDetails, fromUser: data };
    const res = await instance.post("/user/update-user-details", formData);
    console.log(res.data);
    setErr(res.data.error);
    setSuccessMsg(res.data.success);

    if (res.data.authToken) {
      console.log("Update cookie ");
      Cookies.remove("authToken");
      setClicked(true);
      setTimeout(() => {
        navigate("/");
      }, 3500);
    }
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
  const renderItems = (upDateWhat) => {
    console.log(upDateWhat, "Yes");
    return Object.values(upDateWhat).map((items) => {
      return <p>{items}</p>;
    });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageSrc(result);
    };
    reader.readAsDataURL(file);
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
            <form
              action=""
              encType="multipart/form-data"
              style={{ display: "flex", flexDirection: "column" }}
              method="post"
            >
              <img
                id="profileLarge"
                src={imageSrc}
                style={{ border: "1px solid red" }}
              />
              <label htmlFor="changeProfile"></label>
              <label htmlFor="upload-photo" id="" style={{ cursor: "pointer" }}>
                + Change profile pic
              </label>
              <input
                type="file"
                name="files"
                id="upload-photo"
                onChange={handleUpload}
              />
              <input
                type="submit"
                value="Upload pic"
                className="submitDark"
                style={{ margin: "10px 0" }}
              />
            </form>

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
                  onClick={clicked ? null : handleSubmit}
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
          {Object.keys(successMsg).length != 0 ? (
            <div id="successBox">{renderItems(successMsg)}</div>
          ) : (
            ""
          )}
          {Object.keys(err).length != 0 ? (
            <div id="errBox">{renderItems(err)}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
