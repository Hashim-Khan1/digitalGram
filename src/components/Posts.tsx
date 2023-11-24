import { useState, useEffect, useMemo } from "react";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;
function Posts(props: any) {
  const [postData, setpostData] = useState({});
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const getPostInfo = async () => {
    const res = await instance.get("/post/info/" + props.postID);
    setpostData(res.data);
  };
  const renderItems = (dataObj: Object) => {
    if (Object.keys(dataObj).length == 0) {
      props.isActive("Post doesnt exist");
      return <p>Post doesnt exist</p>;
    } else {
      props.isActive("Post exist");
      return (
        <div className="postContainer">
          <div
            className="row"
            style={{ alignItems: "center", marginBottom: "10px" }}
          >
            <div className="profileImg"></div>
            <p>{dataObj?.createdby}</p>
            <p>{dataObj?.date}</p>
          </div>
          <img
            src={VITE_API_URL + "/post/image/post/" + dataObj?.pictureurl}
            alt=""
            className="postImg"
          />
          <div
            className="row"
            style={{ alignItems: "center", margin: "10px 0" }}
          >
            <div className="postIcons heart"></div>
            <div className="postIcons comment"></div>
            <div className="postIcons send"></div>
          </div>
          <p>{dataObj?.likes}</p>
          <p>
            <b>{dataObj?.createdby}</b> {dataObj?.caption}
          </p>
          <p className="greyText">View all comments 115 </p>
        </div>
      );
    }
  };
  useEffect(() => {
    getPostInfo();
  }, []);
  return <>{renderItems(postData)}</>;
}
export default Posts;
