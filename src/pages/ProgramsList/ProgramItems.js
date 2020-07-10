import React, { Fragment, useState } from "react";
import { Input, Layout, List, Tabs, PageHeader } from "antd";
import ItemDetailsModal from "./ItemDetailsModal";
import ListItem from "./ListItem";
import ProgramsItemsSider from "./ProgramItemsSider";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;

const dummyData = [];
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
    tags: ["Food", "Lifestyle"],
    avatar: "https://image.flaticon.com/icons/svg/3163/3163231.svg",
    description:
      "This is part of a research study to investigate the correlation between eating habits and stress levels.",
    content:
      "A team of student researchers from the Faculty of Science of XXX University wants to investigate the correlation between eating habits and stress levels as part of their FYP.",
  });
}

const ProgramItems = () => {
  const [current, setCurrent] = useState("1");

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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
        <ProgramsItemsSider />
        <PageHeader
          title="Programs"
          className="site-page-header"
          extra={
            <Tabs
              defaultActiveKey="1"
              selectedKeys={current}
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
              dataSource={dummyData}
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
