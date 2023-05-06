import CreatePost from "./CreatePost";
import Search from "./Search";

function Modal(props: any) {
  return (
    <>
      <div id="Modal">
        {props.modalType == "Search" ? (
          <Search />
        ) : props.modalType == "Create" ? (
          <CreatePost />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Modal;
