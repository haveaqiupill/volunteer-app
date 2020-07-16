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

const ProgramItems = ({ "*": cat }) => {
  const navigate = useNavigate();

  const [allPrograms, setAllPrograms] = useState();
  useEffect(() => {
    (async () => {
      const programs = await Db.getAllPrograms();
      setAllPrograms(programs);
      setItems(programs);
    })();
  }, []);

  // Selected programs according to the tabs "All Programs" vs "Registered Programs"
  const [items, setItems] = useState([]);
  // TODO: Filter registered programs
  const registeredPrograms = allPrograms ? allPrograms.slice(1, 2) : {};
  const [currentTab, setCurrentTab] = useState("1");

  const handleClick = (key) => {
    setCurrentTab(key);
    if (key === "1") {
      setItems(allPrograms);
    } else {
      setItems(registeredPrograms);
    }
  };

  // Filtered programs according to the categories in the sidebar
  const [filteredItems, setFilteredItems] = useState();
  const [isFiltered, setIsFiltered] = useState(!!cat);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState();
  const showModal = (item) => {
    setModalItem(item);
    setModalVisible(true);
  };

  return (
    <Fragment>
      <Layout style={{ marginLeft: 200 }}>
        <ProgramsItemsSider
          items={items}
          isFiltered={isFiltered}
          setIsFiltered={setIsFiltered}
          setFilteredItems={setFilteredItems}
          cat={
            cat === "arts & heritage"
              ? "Arts & Heritage"
              : cat.charAt(0).toUpperCase() + cat.slice(1)
          }
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
                pageSize: 7,
              }}
              dataSource={isFiltered ? filteredItems : items}
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
