import React from "react";
export default function UserSearchContainer(props: any) {
  return (
    <a
      href={`user/${props.username}`}
      style={{ fontSize: "14px", textDecoration: "NONE" }}
    >
      <div className="userSearchContainer row alignCenter">
        <div className="profileImg"></div>
        <p>{props.username}</p>
      </div>
    </a>
  );
}
