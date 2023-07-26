import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Auth from "../hooks/Auth";
import ActionRow from "./ActionRow";

const { VITE_API_URL } = import.meta.env;

function ViewRequests(props: any) {
  const userInfo = Auth();
  const [totalRequests, settotalRequests] = useState([]);
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const getUserRequests = async (username) => {
    const res = await instance.get("/user/totalrequests/" + username);
    settotalRequests(res.data);
    console.log(res);
  };

  const acceptedRequests = async (username) => {
    const res = await instance.get("/user/acceptedRequests/" + username);
    settotalRequests(res.data);
    console.log(res);
  };

  const renderRequests = (e, requestType) => {
    console.log(requestType, "YTolabOT");
    if (e) {
      const { data } = e;
      if (requestType == "IncomingRequests") {
        getUserRequests(data);
      } else {
        acceptedRequests(data);
      }
    }
  };
  const renderRow = (userData) => {
    return userData.map((index) => {
      return (
        <ActionRow key={index.userID} data={index} btns={props.actionBtn} />
      );
    });
  };
  useEffect(() => {
    renderRequests(userInfo, props.requestType);
  }, [userInfo]);
  return (
    <>
      <div id="createPost">
        <p>View Request</p>
        {renderRow(totalRequests)}
      </div>
    </>
  );
}
export default ViewRequests;
