const { VITE_API_URL } = import.meta.env;

function Users(props: any) {
  console.log(props.data, "ttt");
  const getMessages = (e) => {
    const { id } = e.currentTarget;
    props.LoadData(id);
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
