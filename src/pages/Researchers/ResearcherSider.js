import React from "react";
import { Divider, Layout, Menu, Space } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

const ResearcherSider = () => {
  const { Sider } = Layout;

  const navigate = useNavigate();

  const handleTag = key => {
    if (key === "0") {
      navigate(`/researcher`);
    } else {
      navigate(`/researcher/postings`);
    }
  };

  const classes = useStyles();

  return (
    <Sider
      width={200}
      style={{
        overflow: "auto",
        height: "95vh",
        position: "fixed",
        left: 0,
      }}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        onSelect={({ key }) => {
          handleTag(key);
        }}
        defaultSelectedKeys={["0"]}
      >
        <Space className={classes.title}>
          <h4> </h4>
          <Divider />
        </Space>
        <Menu.Item key="0">Profile</Menu.Item>
        <Menu.Item key="1">Postings</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default ResearcherSider;
