import React, { Fragment } from "react";
import { Layout } from "antd";

import AppAppBar from "../../modules/views/AppAppBar";
import ProgramsItems from "./ProgramItems";
import ItemForm from "./ItemForm";
import { Router } from "@reach/router";

const ProgramsMain = () => {
  return (
    <Fragment>
      <AppAppBar />
      <Layout>
        <Router>
          <ProgramsItems path="/" />
          <ItemForm path=":id" />
        </Router>
      </Layout>
    </Fragment>
  );
};

export default ProgramsMain;
