import FromMessages from "./FromMessages";
import ToMessages from "./ToMessages";

function MessageBox() {
  return (
    <>
      <div id="msgHeader" className="row alignCenter">
        <p style={{ fontSize: "18px" }}>Username</p>
        <div className="navIcons phone" style={{ marginLeft: "auto" }}></div>
      </div>
      <div id="userMessages">
        <FromMessages />
        <ToMessages />
      </div>
      <div className="row">
        <input type="text" className="inputField" style={{ color: "black" }} />
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
    </>
  );
}
export default MessageBox;
