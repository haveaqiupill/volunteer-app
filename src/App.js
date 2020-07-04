import React, { Fragment } from 'react';
import withRoot from "./onepirate/modules/withRoot";

import NavbarView from "./onepirate/modules/views/NavbarView";

function App() {
  return (
      <Fragment>
          <NavbarView />
      </Fragment>
  );
}

export default withRoot(App);
