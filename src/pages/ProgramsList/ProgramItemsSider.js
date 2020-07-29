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

  const [tag, setTag] = useState(cat ? cat : "");
  const filterItems = useCallback(() => {
    reset();
    if (tag === "All Programs") {
      setFilteredItems(items);
      setIsFiltered(false);
    } else if (tag === "Recommended") {
      setFilteredItems(recommendedItems);
      setIsFiltered(false);
    } else {
      const filteredItems = items.filter(item => item.tags.includes(tag));
      setFilteredItems(filteredItems);
      setIsFiltered(true);
    }
  }, [items, setIsFiltered, setFilteredItems, tag, reset]);

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
