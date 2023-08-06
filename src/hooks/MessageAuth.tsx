import axios from "axios";
const { VITE_API_URL } = import.meta.env;

function MessageAuth(username, friendID) {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });

  const checkAuth = async () => {
    try {
      const res = await instance.post("/user/auth-message", {
        username: username,
        friendID: friendID,
      });
      // You can return the response or any relevant data here if needed
      return res.data.isAuth;
    } catch (error) {
      console.error("Message authentication failed:", error);
      // You can return an error message or handle the error in some other way
      throw error;
    }
  };

  return {
    checkAuth,
  };
}

export default MessageAuth;
