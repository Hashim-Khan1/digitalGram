const { VITE_API_URL } = import.meta.env;
import { useNavigate } from "react-router-dom";

function Users(props: any) {
  const navigate = useNavigate();
  const getMessages = (e) => {
    const { id } = e.currentTarget;
    navigate("/Inbox/t/" + id);
  };
  return (
    <>
      <div
        className="userBox row alignCenter"
        key={props.data.friend_ID}
        id={props.data.friend_ID}
        onClick={getMessages}
      >
        <img
          src={
            props.data.profilepicurl == false
              ? `/src/assets/img/defaultProfile.jpg`
              : VITE_API_URL +
                "/post/image/profile/" +
                props.data?.profilepicurl
          }
          className="userProfile"
        />

        <p>{props.data.fromUser}</p>
      </div>
    </>
  );
}
export default Users;
