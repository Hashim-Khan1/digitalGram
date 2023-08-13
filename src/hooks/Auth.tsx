import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const { VITE_API_URL } = import.meta.env;

function Auth() {
  const [userinfo, setUserInfo] = useState(null);
  const Navigate = useNavigate();

  const checkToken = async () => {
    const cookieVal = Cookies.get("authToken");
    if (cookieVal !== undefined) {
      const instance = axios.create({ baseURL: VITE_API_URL });
      const res = await instance.post("/token/verify-token", {
        token: cookieVal,
      });

      if (res.data.isAuth === false) {
        Navigate("/");
      }

      setUserInfo(res.data.isAuth);
      return res.data.isAuth;
    } else {
      Navigate("/");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      let userValue = await checkToken();

      while (!userValue) {
        userValue = await checkToken();
      }
    };

    fetchUserInfo();
  }, []);

  return userinfo;
}

export default Auth;
