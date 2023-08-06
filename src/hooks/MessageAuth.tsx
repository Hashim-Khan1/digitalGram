import axios from "axios";
const { VITE_API_URL } = import.meta.env;
async function MessageAuth(username, friendID) {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const res = await instance.post("/user/auth-message", {
    username: username,
    friendID: friendID,
  });
  console.log(res);
}
export default MessageAuth;
