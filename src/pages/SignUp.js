import withRoot from "../modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import AppFooter from "../modules/views/AppFooter";
import AppAppBar from "../modules/views/AppAppBar";

function SignUp({ children }) {
  return (
    <React.Fragment>
      <AppAppBar />
      {children}
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
