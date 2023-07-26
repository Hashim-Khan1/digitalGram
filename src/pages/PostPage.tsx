import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Posts from "../components/Posts";
const { VITE_API_URL } = import.meta.env;
export default function PostPage() {
  const [postIDURL, setPostID] = useState("");
  const [PostData, setPostData] = useState("");
  const checkPost = (e) => {
    setPostData(e);
  };
  useMemo(() => {
    const URL = window.location.pathname;
    const ID = URL.split("/").pop();
    setPostID(ID);
  }, [PostData]);
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
          <Posts postID={postIDURL} isActive={checkPost} />
        </div>
      </div>
    </>
  );
}
