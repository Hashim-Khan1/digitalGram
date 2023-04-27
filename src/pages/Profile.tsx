import Nav from "../components/Nav";

function Profile() {
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
                <p style={{ fontSize: "25px" }}>Username</p>
                <div className="row">
                  <div className="profileControlsBtn">Following</div>
                  <div className="profileControlsBtn">Messages</div>
                </div>
              </div>
              <div id="userInfoBox">
                <p>Name</p>
                <p>
                  Bio Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  In, amet?
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
          <p style={{ textAlign: "center" }}>POSTS</p>
          <div id="postsContentContainer">
            <div className="posts"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
