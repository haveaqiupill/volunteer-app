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
          <Menu.Item key="1">Psychology</Menu.Item>
          <Menu.Item key="2">Healthcare</Menu.Item>
          <Menu.Item key="3">Sports</Menu.Item>
          <Menu.Item key="4">Food</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Location" icon={<HomeOutlined />}>
          <Menu.Item key="5">North</Menu.Item>
          <Menu.Item key="6">South</Menu.Item>
          <Menu.Item key="7">East</Menu.Item>
          <Menu.Item key="8">West</Menu.Item>
          <Menu.Item key="8">Central</Menu.Item>
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
