import React from "react";
import withRoot from "./onepirate/modules/withRoot";
import { Router } from "@reach/router";

import Home from "./onepirate/Home";
import SignUp from "./onepirate/SignUp";
import SignIn from "./onepirate/SignIn";

import "./util/firebase.js";

function App() {
  return (
    <Router>
      <Home path="/" />

      <SignUp path="/sign-up" />
      <SignIn path="/sign-in" />
    </Router>
  );
}

export default withRoot(App);
