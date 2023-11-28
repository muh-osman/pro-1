// React
import { useContext } from "react";
// Context
import { UserContext } from "../contexts/UserProvider";
// Outlet
import { Navigate, Outlet } from "react-router-dom";




export default function RequireAuth() {
  const { userAuth } = useContext(UserContext);

  return userAuth.token ? <Outlet /> : <Navigate to="login" />;
}
