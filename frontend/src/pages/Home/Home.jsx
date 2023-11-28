import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserProvider";

export default function Home() {
  const { userAuth } = useContext(UserContext);

  useEffect(() => {
    console.log(userAuth);
  }, []);

  return <h1 className="text-center mt-5">Welcome to unicorn website</h1>;
}
