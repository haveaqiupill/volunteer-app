import React, { useEffect, createContext } from "react";
import Auth from "./Authentication";
import Db from "./Database";

export const UserContext = createContext({ user: null });

function UserProvider(props) {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    Auth.observeAuthState(async firebaseUser => {
      if (firebaseUser == null) {
        setUser(firebaseUser);
        return;
      }

      const userData = await Db.getUserData(firebaseUser.uid);

      firebaseUser.data = userData;
      firebaseUser.isResearcher = () => userData.userType === "researcher";
      firebaseUser.isVolunteer = () => userData.userType === "volunteer";

      setUser(firebaseUser);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider;
