import React from "react";
import withRoot from "./modules/withRoot";
import { Router } from "@reach/router";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ListView from "./pages/ListView";
import SignUpResearcher from "./pages/SignUpResearcher";
import SignUpVolunteer from "./pages/SignUpVolunteer";
import ProgramsMain from "./pages/ProgramsList/ProgramsMain";
import "./util/firebase.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Home path="/" />
      <SignUp path="/sign-up"/>
      <SignUpResearcher path="/sign-up/researcher"/>
      <SignUpVolunteer path="/sign-up/volunteer" />
      <SignIn path="/sign-in" />
      <ListView path="/programs" />
      <ProgramsMain path="/programs" />
    </Router>
  );
}

export default withRoot(App);
