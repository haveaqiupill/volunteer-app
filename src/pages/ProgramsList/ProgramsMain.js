import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import { Space, Layout, Menu, Divider } from "antd";

import AppAppBar from "../../modules/views/AppAppBar";
import AppFooter from "../../modules/views/AppFooter";
import ProgramsItems from "./ProgramItems";

const { SubMenu } = Menu;
const { Sider } = Layout;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  title: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

const ProgramsMain = () => {
  const classes = useStyles();
  const categories = ["Psychology", "Healthcare", "Sports", "Food"];
  const locations = ["North", "South", "East", "West", "Central"];

  const sider = (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Space className={classes.title}>
          <h4>FILTER BY</h4>
          <Divider />
        </Space>
        <SubMenu key="sub1" title="Categories" icon={<BookOutlined />}>
          {categories.map((category, i) => {
            return <Menu.Item key={i}>{category}</Menu.Item>;
          })}
        </SubMenu>
        <SubMenu key="sub2" title="Location" icon={<HomeOutlined />}>
          {locations.map((location, i) => {
            return <Menu.Item key={i}>{location}</Menu.Item>;
          })}
        </SubMenu>
      </Menu>
    </Sider>
  );

  return (
    <Fragment>
      <AppAppBar />
      <Layout>
        {sider}
        <ProgramsItems />
      </Layout>
      <AppFooter />
    </Fragment>
  );
};

export default ProgramsMain;
