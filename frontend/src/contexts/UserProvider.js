import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userAuth, setUserAuth] = useState({
    token: "",
    name: "",
    id: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
}
