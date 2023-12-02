// React
import { useEffect, useLayoutEffect, useState } from "react";
// React router
import { Navigate, Outlet, useNavigate } from "react-router-dom";
// Cookie
import { useCookies } from "react-cookie";
// Axios
import axios from "axios";

export default function RequireAuth() {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token);

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const refreshToken = async () => {

    setAuth(true);

    try {
      const response = await axios.post(`${apiUrl}/api/refresh`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      // Refresh Token
      setCookie("token", response.data.token, {path: "/"});

      
      setLoading(false);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      refreshToken();
    }
    if (!token) {
      navigate("/login");
    }
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : auth ? (
    <Outlet />
  ) : (
    <Navigate to="login" />
  );
}
