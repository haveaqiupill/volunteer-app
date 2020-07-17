import React, { useEffect, createContext } from "react";
import Auth from "./Authentication";
import Db from "./Database";

export const UserContext = createContext({ user: null });

function UserProvider(props) {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    Auth.observeAuthState(async user => {
      if (user === null) {
        setUser(user);
        return;
      }

      const userData = await Db.getUserData(user.uid);

      user.data = userData;
      user.isResearcher = () => userData.userType === "researcher";
      user.isVolunteer = () => userData.userType === "volunteer";

      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider;
