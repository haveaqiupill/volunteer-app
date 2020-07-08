import React from "react";
import withRoot from "./modules/withRoot";
import { Router } from "@reach/router";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ListView from "./pages/ListView";

import "./util/firebase.js";

function App() {
  return (
    <Router>
      <Home path="/" />

      <SignUp path="/sign-up" />
      <SignIn path="/sign-in" />

      <ListView path="/programs" />
    </Router>
  );
}

export default withRoot(App);
