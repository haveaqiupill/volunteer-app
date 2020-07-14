import React from "react";
import withRoot from "./modules/withRoot";
import { Router } from "@reach/router";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignUpResearcher from "./pages/SignUpResearcher";
import SignUpVolunteer from "./pages/SignUpVolunteer";
import ProgramsMain from "./pages/ProgramsList/ProgramsMain";
import Researcher from "./pages/Researchers/ResearcherMain";
import "./util/firebase.js";
import UserProvider from "./util/UserProvider";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Home path="/" />
        <SignUp path="/sign-up" />
        <SignUpResearcher path="/sign-up/researcher" />
        <SignUpVolunteer path="/sign-up/volunteer" />
        <SignIn path="/sign-in" />
        <Researcher path="/researcher/*" />
        <ProgramsMain path="/programs/*" />
      </Router>
    </UserProvider>
  );
}

export default withRoot(App);
