import React, { Fragment, useState } from "react";
import { Input, Layout, List, Tabs, PageHeader } from "antd";
import ItemDetailsModal from "./ItemDetailsModal";
import ListItem from "./ListItem";
import ProgramsItemsSider from "./ProgramItemsSider";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;

// The data below is for testing and will be deleted once the API is up
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
    avatar: "https://image.flaticon.com/icons/svg/3163/3163231.svg",
    description:
      "This is part of a research study to investigate the correlation between eating habits and stress levels.",
    content:
      "A team of student researchers from the Faculty of Science of XXX University wants to investigate the correlation between eating habits and stress levels as part of their FYP.",
  });
}
// The data above is for testing and will be deleted once the API is up

const ProgramItems = () => {
  const [currentTab, setCurrentTab] = useState("1");
  const [items, setItems] = useState(dummyData);
  const [registeredPrograms, setRegisteredPrograms] = useState(
    dummyData.slice(3, 5)
  );

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrentTab(e.key);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState();
  const showModal = (item) => {
    setModalItem(item);
    setModalVisible(true);
  };

  return (
    <Fragment>
      <Layout style={{ marginLeft: 200 }}>
        <ProgramsItemsSider items={dummyData} setItems={setItems} />
        <PageHeader
          title="Programs"
          className="site-page-header"
          extra={
            <Tabs
              defaultActiveKey="1"
              selectedKeys={currentTab}
              onClick={handleClick}
            >
              <TabPane tab="All Programs" key="1" />
              <TabPane tab="Registered Programs" key="2" />
            </Tabs>
          }
        >
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
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
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 7,
              }}
              dataSource={items}
              renderItem={(item) => (
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
