import { useState } from "react";
function CreatePost() {
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = (e: any) => {
    const files = e.target.files;
    const imgArray: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = () => {
        imgArray.push(reader.result as string);
        setImages((prevImages) => [...prevImages, ...imgArray]);
      };
      reader.readAsDataURL(files[i]);
    }
  };
  return (
    <>
      <div id="createPost">
        <p>Create a post</p>
        <form
          action=""
          encType="multipart/form-data"
          style={{ display: "flex" }}
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
                name="photo"
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
              name=""
              className="searchInpt"
              placeholder="Add caption max"
            ></textarea>
            <input
              type="text"
              className="searchInpt"
              placeholder="Add Title"
              style={{
                border: "2px solid rgba(128, 128, 128, 0.123)",
                width: "100%",
              }}
            />
            <input type="submit" value="Add post" className="submitDark" />
          </div>
        </form>
      </div>
    </>
  );
}
export default CreatePost;
