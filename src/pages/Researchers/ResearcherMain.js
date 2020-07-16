import React, { Fragment } from "react";
import { Layout } from "antd";
import { Router } from "@reach/router";

import AppAppBar from "../../modules/views/AppAppBar";
import ResearcherProfile from "./ResearcherProfile";
import ResearcherPostings from "./ResearcherPostings";
import ResearcherSider from "./ResearcherSider";

const ResearcherMain = () => {
  return (
    <Fragment>
      <AppAppBar />
      <ResearcherSider/>
      <Layout>
        <Router>
          <ResearcherProfile path="/" />
          <ResearcherPostings path="postings" />
        </Router>
      </Layout>
    </Fragment>
  );
};

export default ResearcherMain;
