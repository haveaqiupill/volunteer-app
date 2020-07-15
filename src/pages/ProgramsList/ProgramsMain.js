import React, { Fragment } from "react";
import { Layout } from "antd";

import AppAppBar from "../../modules/views/AppAppBar";
import ProgramsItems from "./ProgramItems";
import ProgramPostForm from "../Researchers/ProgramPostForm";
import { Router } from "@reach/router";

const ProgramsMain = () => {
  return (
    <Fragment>
      <AppAppBar />
      <Layout>
        <Router>
          <ProgramsItems path="/*" />
          <ProgramPostForm path="create" />
        </Router>
      </Layout>
    </Fragment>
  );
};

export default ProgramsMain;
