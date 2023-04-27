import Nav from "../components/Nav";
import Users from "../components/Users";

function Inbox() {
  return (
    <>
      <Nav />
      <div
        id="messageContainer"
        className="row"
        style={{ border: "1px solid rgba(128, 128, 128, 0.123)" }}
      >
        <div id="userMsgContainer">
          <Users />
        </div>
        <div id="msgBody" style={{ width: "100%" }}>
          <div id="msgHeader" className="row alignCenter">
            <p style={{ fontSize: "18px" }}>Username</p>
            <div
              className="navIcons phone"
              style={{ marginLeft: "auto" }}
            ></div>
          </div>
          <div id="userMessages">
            <div className="userMsg myMsg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
              tempora a, ad aspernatur officiis facilis.
            </div>
            <div className="userMsg toMsg">Lorem ipsum dolor sit amet.</div>
          </div>

          <div className="row">
            <input
              type="text"
              className="inputField"
              style={{ color: "black" }}
            />
            <div
              style={{
                marginLeft: "auto",
                border: "1px solid rgba(128, 128, 128, 0.123) ",
                padding: "5px 12px",
                cursor: "pointer",
              }}
            >
              SEND
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Inbox;
