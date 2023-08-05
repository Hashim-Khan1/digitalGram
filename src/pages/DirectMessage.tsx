import { useState, useEffect, useMemo } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import axios from "axios";
import MessageBox from "../components/messages/messageBox";

const { VITE_API_URL } = import.meta.env;
function DirectMessage() {
  const { ID } = useParams();
  console.log(ID);
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  useEffect(() => {}, []);

  return (
    <>
      <MessageBox />
    </>
  );
}
export default DirectMessage;
