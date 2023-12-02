import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { Outlet } from "react-router-dom";

export default function RefreshToken() {
  const [loading, setLoading] = useState(true);

  const { userAuth, setUserAuth } = useContext(UserContext);
  const token = userAuth.token;

  const apiUrl = process.env.REACT_APP_API_URL;
  const refreshToken = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/refresh`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUserAuth((prev) => ({ ...prev, token: response.data.token }));
      setLoading(false);
      //   console.log(userAuth);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return loading ? <h1>Loading...</h1> : <Outlet />;
}
