import CreatePost from "./CreatePost";
import Search from "./Search";

function Modal(props: any) {
  const handleResponse = (data: any) => {
    props.modalResponse(data);
  };
  return (
    <>
      <div id="Modal">
        {props.modalType == "Search" ? (
          <Search response={handleResponse} />
        ) : props.modalType == "Create" ? (
          <CreatePost response={handleResponse} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Modal;
