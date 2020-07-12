import React, { Fragment } from "react";
import withRoot from "./onepirate/modules/withRoot";

import NavbarView from "./onepirate/modules/views/NavbarView";
import ProductHero from "./onepirate/modules/views/ProductHero";
import ProductValues from "./onepirate/modules/views/ProductValues";
import ProductCategories from "./onepirate/modules/views/ProductCategories";
import ProductSmokingHero from "./onepirate/modules/views/ProductSmokingHero";
import AppFooter from "./onepirate/modules/views/AppFooter";

import "./util/firebase.js";
<<<<<<< integrate-signup
import SignUp from "./onepirate/modules/views/SignUp";

function App() {
  return (
    <Fragment>
      <NavbarView title="RSearchV" />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductSmokingHero />
      <SignUp />
      <AppFooter />
    </Fragment>
=======
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

        <ProgramsMain path="/programs/*" />
      </Router>
    </UserProvider>
>>>>>>> local
  );
}

export default withRoot(App);
