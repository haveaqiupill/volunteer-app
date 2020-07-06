import React, { Fragment } from "react";
import withRoot from "./onepirate/modules/withRoot";

import NavbarView from "./onepirate/modules/views/NavbarView";
import ProductHero from "./onepirate/modules/views/ProductHero";
import ProductValues from "./onepirate/modules/views/ProductValues";
import ProductCategories from "./onepirate/modules/views/ProductCategories";
import ProductSmokingHero from "./onepirate/modules/views/ProductSmokingHero";
import AppFooter from "./onepirate/modules/views/AppFooter";

import "./util/firebase.js";
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
  );
}

export default withRoot(App);
