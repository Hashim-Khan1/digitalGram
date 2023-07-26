import CreatePost from "./CreatePost";
import Search from "./Search";
import ViewRequests from "./ViewRequests";

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
        ) : props.modalType == "Requests" ? (
          <ViewRequests
            response={handleResponse}
            actionBtn="Both"
            requestType="IncomingRequests"
          />
        ) : props.modalType == "FriendsList" ? (
          <ViewRequests
            response={handleResponse}
            actionBtn="Delete"
            requestType="ConfirmedRequests"
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Modal;
