import { useState } from "react";
import UserSearchContainer from "./UserSearchContainer";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;

function Search(props: any) {
  const [userProfiles, SETuserProfiles] = useState([]);
  const handleChange = async (e: any) => {
    const { value } = e.currentTarget;
    if (value == "" || undefined) {
      SETuserProfiles([]);
    } else {
      const instance = axios.create({ baseURL: VITE_API_URL });
      const res = await instance.post("/user/search", {
        users: value,
      });
      SETuserProfiles(res.data.TotalAvaliableUsers);
    }
  };
  return (
    <>
      <div id="searchContainer">
        <div className="row">
          <input
            type="text"
            className="searchInpt"
            placeholder="Search Username"
            onChange={handleChange}
          />
          <div id="search"></div>
        </div>
        {userProfiles.map((index) => {
          return <UserSearchContainer username={index.username} />;
        })}
      </div>
    </>
  );
}
export default Search;
