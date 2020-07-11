import React from "react";
import withRoot from "./modules/withRoot";
import { Router } from "@reach/router";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignUpResearcher from "./pages/SignUpResearcher";
import SignUpVolunteer from "./pages/SignUpVolunteer";
import ProgramsMain from "./pages/ProgramsList/ProgramsMain";
import "./util/firebase.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Home path="/" />
      <SignUp path="/sign-up">
        <SignUpResearcher path="researcher" />
        <SignUpVolunteer path="volunteer" />
      </SignUp>
      <SignIn path="/sign-in" />
      <ProgramsMain path="/programs" />
    </Router>
  );
}

export default withRoot(App);
