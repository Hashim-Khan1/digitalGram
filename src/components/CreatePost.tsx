import { useState } from "react";
import { v4 as uuid } from "uuid";
const { VITE_API_URL } = import.meta.env;
import axios from "axios";
import Auth from "../hooks/Auth";

function CreatePost(props: any) {
  const userResult = Auth();
  const [images, setImages] = useState<string[]>([]);
  const [fileList, setFileList] = useState([]);

  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const handleUpload = (e: any) => {
    const files = e.target.files;
    const imgArray: string[] = [];
    const currentFile = e.target.files;

    setFileList((prev) => [...prev, ...currentFile]);

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        imgArray.push(reader.result as string);
        setImages((prevImages) => [...prevImages, ...imgArray]);
      };
      reader.readAsDataURL(files[i]);
    }
  };
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file);
    });
    const captionInput = document.getElementById("captionInput");
    formData.append("caption", captionInput.value);
    const { data } = userResult;
    formData.append("username", data);

    const res = await instance.post("/post/create-post", formData, config);
    props.response(res.data);
  };
  return (
    <>
      <div id="createPost">
        <p>Create a post</p>
        <form
          action=""
          encType="multipart/form-data"
          style={{ display: "flex" }}
          method="post"
        >
          <div
            id="imgContainer"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              id="imgRow"
              className="row alignCenter"
              style={{ width: "100%" }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`uploaded image ${index}`}
                  width={"25px"}
                />
              ))}
              <label htmlFor="upload-photo" id="addLabel">
                +
              </label>
              <input
                type="file"
                name="files"
                id="upload-photo"
                multiple
                onChange={handleUpload}
              />
            </div>
            <div id="bigImg"></div>
          </div>
          <div style={{ width: "40%" }}>
            <textarea
              style={{
                border: "2px solid rgba(128, 128, 128, 0.123)",
                width: "100%",
              }}
              id="captionInput"
              name="caption"
              className="searchInpt"
              placeholder="Add caption max"
            ></textarea>

            <input
              type="submit"
              value="Add post"
              className="submitDark"
              onClick={onSubmitHandler}
            />
          </div>
        </form>
      </div>
    </>
  );
}
export default CreatePost;
