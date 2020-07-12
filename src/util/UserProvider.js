import React, { useEffect, createContext } from "react";
import Auth from "./Authentication";

export const UserContext = createContext({ user: null });

function UserProvider(props) {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    Auth.observeAuthState(user => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider;
