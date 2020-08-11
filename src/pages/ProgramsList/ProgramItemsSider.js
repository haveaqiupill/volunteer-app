import React, { useEffect, useCallback, useState, useContext } from "react";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import { Divider, Layout, Menu, Space } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

export const categories = [
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
export const locations = ["North", "South", "East", "West", "Central"];
export const joinedMenuItems = [
  "All Programs",
  "Recommended",
  ...categories,
  ...locations,
];

const ProgramsItemsSider = ({
  items,
  recommendedItems,
  isFiltered,
  setIsFiltered,
  setFilteredItems,
  reset,
  cat,
}) => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;

  const filterItems = useCallback(
    newTag => {
      reset();
      if (newTag === "All Programs") {
        setFilteredItems(items);
        setIsFiltered(false);
      } else if (newTag === "Recommended") {
        setIsFiltered(true);
        setFilteredItems(recommendedItems);
      } else {
        const filteredItems = items.filter(item => item.tags.includes(newTag));
        setIsFiltered(items !== []);
        setFilteredItems(filteredItems);
      }
    },
    [
      isFiltered,
      recommendedItems,
      items,
      setIsFiltered,
      setFilteredItems,
      reset,
    ]
  );

  useEffect(() => {
    if (cat) {
      filterItems(cat);
    }
  }, [items, cat]);

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
          const newTag = joinedMenuItems[key];
          filterItems(newTag);
          if (cat) {
            navigate("/programs");
          }
        }}
        defaultSelectedKeys={
          cat ? [joinedMenuItems.findIndex(e => e === cat).toString()] : ["0"]
        }
      >
        <Space className={classes.title}>
          <h4>FILTER BY</h4>
          <Divider />
        </Space>
        <Menu.Item key="0">All Programs</Menu.Item>
        <Menu.Item key="1">Recommended</Menu.Item>
        <SubMenu key="sub1" title="Categories" icon={<BookOutlined />}>
          {categories.map((category, i) => {
            return <Menu.Item key={i + 2}>{category}</Menu.Item>;
          })}
        </SubMenu>
        <SubMenu key="sub2" title="Location" icon={<HomeOutlined />}>
          {locations.map((location, i) => {
            return (
              <Menu.Item key={i + categories.length + 2}>{location}</Menu.Item>
            );
          })}
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default ProgramsItemsSider;
