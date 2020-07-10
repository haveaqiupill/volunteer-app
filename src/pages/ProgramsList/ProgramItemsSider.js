import React, { useEffect, useCallback, useState } from "react";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import { Divider, Layout, Menu, Space } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

const ProgramsItemsSider = ({ items, isFiltered, setIsFiltered, setItems }) => {
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
  const joinedMenuItems = ["All Programs", ...categories, ...locations];

  const [tag, setTag] = useState("");
  const filterItems = useCallback(() => {
    if (tag === "All Programs") {
      setItems(items);
      setIsFiltered(false);
    } else {
      const filteredItems = items.filter((item) => item.tags.includes(tag));
      setItems(filteredItems);
      setIsFiltered(true);
    }
  }, [items, setIsFiltered, setItems, tag]);

  useEffect(() => {
    if (isFiltered) {
      filterItems();
    }
  }, [filterItems, isFiltered, items]);

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
          setTag(joinedMenuItems[key]);
          filterItems();
        }}
        defaultSelectedKeys={["0"]}
      >
        <Space className={classes.title}>
          <h4>FILTER BY</h4>
          <Divider />
        </Space>
        <Menu.Item key="0">All Programs</Menu.Item>
        <SubMenu key="sub1" title="Categories" icon={<BookOutlined />}>
          {categories.map((category, i) => {
            return <Menu.Item key={i + 1}>{category}</Menu.Item>;
          })}
        </SubMenu>
        <SubMenu key="sub2" title="Location" icon={<HomeOutlined />}>
          {locations.map((location, i) => {
            return (
              <Menu.Item key={i + categories.length + 1}>{location}</Menu.Item>
            );
          })}
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default ProgramsItemsSider;
