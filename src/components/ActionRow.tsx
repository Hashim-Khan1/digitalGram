import { useState } from "react";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

function ActionRow(props: any) {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const addUser = async (userID) => {
    const res = await instance.post("/user/accept-request", {
      friendID: userID,
    });
  };
  const deleteUser = async (userID) => {
    const res = await instance.post("/user/delete-request", {
      friendID: userID,
    });
  };

  return (
    <>
      <div className="row alignCenter" style={{ margin: "10px 0" }}>
        <img
          src={
            props.data.profilepicurl == null
              ? `/src/assets/img/defaultProfile.jpg`
              : VITE_API_URL +
                "/post/image/profile/" +
                props.data?.profilepicurl
          }
          style={{ width: "35px", height: "35px", borderRadius: "999px" }}
        />
        <p style={{ paddingLeft: "10px" }}>{props.data.fromUser}</p>
        {props.btns == "Both" ? (
          <div className="row" style={{ marginLeft: "auto" }}>
            <div
              className="profileControlsBtn"
              onClick={() => addUser(props.data.friend_ID)}
            >
              Accept Friend
            </div>
            <div
              className="profileControlsBtn"
              onClick={() => deleteUser(props.data.friend_ID)}
            >
              Remove Friend
            </div>
          </div>
        ) : props.btns == "Accept" ? (
          <div className="row" style={{ marginLeft: "auto" }}>
            <div
              className="profileControlsBtn"
              onClick={() => addUser(props.data.friend_ID)}
            >
              Accept Friend
            </div>
          </div>
        ) : (
          <div className="row" style={{ marginLeft: "auto" }}>
            <div
              className="profileControlsBtn"
              onClick={() => deleteUser(props.data.friend_ID)}
            >
              Remove Friend
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ActionRow;
