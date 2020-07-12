import React, { Fragment, useState, useEffect } from "react";
import { Space, Input, Layout, List, Tabs, PageHeader } from "antd";
import { useNavigate } from "@reach/router";

import ItemDetailsModal from "./ItemDetailsModal";
import ListItem from "./ListItem";
import ProgramsItemsSider from "./ProgramItemsSider";
import Button from "../../modules/components/Button";
import Db from "../../util/Database";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;

// The data below is for testing and will be deleted once the API is up
//TODO Replace dummyData with actual data
const dummyData = [];
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
for (let i = 0; i < 23; i++) {
  dummyData.push({
    id: i,
    title: `Survey ${i}`,
    //depends on type of program
    avatar: "https://image.flaticon.com/icons/svg/3163/3163231.svg",
    //depends on organization of researcher
    image: Math.floor(Math.random() * 3),
    description:
      "This is part of a research study to investigate the correlation between eating habits and stress levels.",
    details: {
      date: "2020-11-12",
      compensation: "$10/hr",
      venue: "NTU North Spine ...",
      duration: "2 hours",
    },
    tags: [
      categories[Math.floor(Math.random() * categories.length)],
      locations[Math.floor(Math.random() * locations.length)],
    ],
    number: 50,
    researcher: "Student ABC",
  });
}
// The data above is for testing and will be deleted once the API is up

const ProgramItems = () => {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("1");
  const [items, setItems] = useState(dummyData);
  const registeredPrograms = dummyData.slice(10, 16);

  const [filteredItems, setFilteredItems] = useState();
  const [isFiltered, setIsFiltered] = useState(false);

  const handleClick = key => {
    setCurrentTab(key);
    if (key === "1") {
      setItems(dummyData);
    } else {
      setItems(registeredPrograms);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState();
  const showModal = item => {
    setModalItem(item);
    setModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      const programs = await Db.getAllPrograms();
      setItems(programs);
    })();
  }, []);

  return (
    <Fragment>
      <Layout style={{ marginLeft: 200 }}>
        <ProgramsItemsSider
          items={items}
          isFiltered={isFiltered}
          setIsFiltered={setIsFiltered}
          setItems={setFilteredItems}
        />
        <PageHeader
          title="Programs"
          className="site-page-header"
          subTitle={
            //TODO Render this button conditionally for researchers only
            <Space>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                component="a"
                onClick={() => navigate(`/programs/create`)}
              >
                Create Posting
              </Button>
            </Space>
          }
          extra={
            <Tabs
              defaultActiveKey="1"
              selectedKeys={currentTab}
              onChange={handleClick}
            >
              <TabPane tab="All Programs" key="1" />
              <TabPane tab="Registered Programs" key="2" />
            </Tabs>
          }
        >
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 700 }}
          />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
            }}
          >
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                pageSize: 7,
              }}
              dataSource={isFiltered ? filteredItems : items}
              renderItem={item => (
                <ListItem item={item} showModal={showModal} />
              )}
            />
            {isModalVisible && (
              <ItemDetailsModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                item={modalItem}
              />
            )}
          </Content>
        </PageHeader>
      </Layout>
    </Fragment>
  );
};

export default ProgramItems;
