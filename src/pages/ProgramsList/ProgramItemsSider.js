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

const ProgramsItemsSider = ({ items, setItems }) => {
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
  const joinedMenuItems = [...categories, ...locations];

  const filterItem = (tag) => {
    const filteredItems = items.filter((item) => item.tags.includes(tag));
    setItems(filteredItems);
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
          filterItem(joinedMenuItems[key]);
        }}
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
            return (
              <Menu.Item key={i + categories.length}>{location}</Menu.Item>
            );
          })}
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default ProgramsItemsSider;
