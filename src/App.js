import React, { Fragment } from 'react';
import withRoot from "./onepirate/modules/withRoot";

import NavbarView from "./onepirate/modules/views/NavbarView";
import ProductHero from "./onepirate/modules/views/ProductHero";
import ProductValues from "./onepirate/modules/views/ProductValues";
import ProductCategories from "./onepirate/modules/views/ProductCategories";
import ProductHowItWorks from "./onepirate/modules/views/ProductHowItWorks";
import ProductCTA from "./onepirate/modules/views/ProductCTA";
import ProductSmokingHero from "./onepirate/modules/views/ProductSmokingHero";
import AppFooter from "./onepirate/modules/views/AppFooter";


function App() {
  return (
      <Fragment>
          <NavbarView title=""/>
          <ProductHero />
          <ProductValues />
          <ProductCategories />
          <ProductHowItWorks />
          <ProductCTA />
          <ProductSmokingHero />
          <AppFooter />
      </Fragment>
  );
}

export default withRoot(App);
