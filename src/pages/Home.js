import withRoot from "../modules/withRoot";
// --- Post bootstrap -----
import React, { Fragment } from "react";
import ProductCategories from "../modules/views/ProductCategories";
import AppFooter from "../modules/views/AppFooter";
import ProductHero from "../modules/views/ProductHero";
import ProductValues from "../modules/views/ProductValues";
import AppAppBar from "../modules/views/AppAppBar";

function Index() {
  return (
    <Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <AppFooter />
    </Fragment>
  );
}

export default withRoot(Index);
