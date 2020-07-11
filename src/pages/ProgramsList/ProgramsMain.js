import React, { Fragment } from "react";
import { Layout } from "antd";

import AppAppBar from "../../modules/views/AppAppBar";
import ProgramsItems from "./ProgramItems";
import ProgramAppForm from "./ProgramAppForm";
import { Router } from "@reach/router";

const ProgramsMain = () => {
  return (
    <Fragment>
      <AppAppBar />
      <Layout>
        <Router>
          <ProgramsItems path="/" />
          <ProgramAppForm path=":id" />
        </Router>
      </Layout>
    </Fragment>
  );
};

export default ProgramsMain;
