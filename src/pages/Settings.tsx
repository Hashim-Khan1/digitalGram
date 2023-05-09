import Nav from "../components/Nav";

export default function SettingsPage() {
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
                />
                <textarea
                  style={{
                    border: "2px solid rgba(128, 128, 128, 0.123)",
                    width: "100%",
                    margin: "10px 0",
                  }}
                  id="captionInput"
                  name="caption"
                  className="searchInpt"
                  placeholder="Add caption max 350 characters"
                  maxLength={350}
                ></textarea>
                <input type="submit" value="Change" className="submitDark" />
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
        </div>
      </div>
    </>
  );
}
