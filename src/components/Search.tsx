import UserSearchContainer from "./UserSearchContainer";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

function Search(props: any) {
  const handleChange = async (e: any) => {
    const { value } = e.currentTarget;
    console.log("ss");
    if (value == "" || undefined) {
      console.log("undefined");
    } else {
      const instance = axios.create({ baseURL: VITE_API_URL });
      const res = await instance.post("/user/search", {
        users: value,
      });
      console.log(value, "valyue");
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
        <UserSearchContainer username="YolaAboyt" />
      </div>
    </>
  );
}
export default Search;
