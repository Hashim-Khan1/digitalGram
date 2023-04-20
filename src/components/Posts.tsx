function Posts() {
  return (
    <>
      <div className="postContainer">
        <div
          className="row"
          style={{ alignItems: "center", marginBottom: "10px" }}
        >
          <div className="profileImg"></div>
          <p>USERNAME</p>
          <p>7ds</p>
        </div>
        <div className="postImg"></div>
        <div className="row" style={{ alignItems: "center", margin: "10px 0" }}>
          <div className="postIcons heart"></div>
          <div className="postIcons comment"></div>
          <div className="postIcons send"></div>
        </div>
        <p>111,000 likes</p>
        <p>
          {" "}
          <b>Uername</b> Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Perspiciatis autem quis dolore molestiae, minima quia veritatis
          impedit facilis! Neque, eos.{" "}
        </p>
        <p className="greyText">View all comments 115 </p>
      </div>
    </>
  );
}
export default Posts;
