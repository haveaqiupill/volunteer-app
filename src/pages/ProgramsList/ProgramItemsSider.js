import React from "react";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import { Divider, Layout, Menu, Space } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

const ProgramsItemsSider = () => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;

  const categories = [
    "Psychology",
    "Healthcare",
    "Sports",
    "Food",
    "Education",
    "Arts & Heritage",
    "Lifestyle",
    "Environment",
    "Elderly",
  ];
  const locations = ["North", "South", "East", "West", "Central"];

  const classes = useStyles();

  return (
    <Sider
      width={200}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
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
};

export default ProgramsItemsSider;
