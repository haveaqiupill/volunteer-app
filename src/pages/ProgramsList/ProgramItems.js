import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Space, Input, Layout, List, Tabs, PageHeader, Row, Col } from "antd";
import { useNavigate } from "@reach/router";
import CircularProgress from "@material-ui/core/CircularProgress";

import ItemDetailsModal from "./ItemDetailsModal";
import ListItem from "./ListItem";
import ProgramsItemsSider from "./ProgramItemsSider";
import Button from "../../modules/components/Button";
import Db from "../../util/Database";
import { UserContext } from "../../util/UserProvider";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;

const ProgramItems = ({ "*": cat }) => {
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const [allPrograms, setAllPrograms] = useState();

  useEffect(() => {
    fetchAllPrograms();
  }, []);

  const fetchAllPrograms = async () => {
    try {
      const programs = await Db.getAllPrograms();
      setAllPrograms(programs);
      setItems(programs);
    } catch (error) {
      console.log("Error fetching all programs", error);
    }
  };

  // Selected programs according to the tabs "All Programs" vs "Registered Programs"
  const [items, setItems] = useState([]);
  const registeredPrograms = allPrograms?.filter(
    program => program.volunteerUserIds?.includes(user?.uid) ?? false
  );
  const [currentTab, setCurrentTab] = useState("1");

  const handleClick = key => {
    resetSearchBar();
    setCurrentTab(key);
    if (key === "1") {
      setItems(allPrograms);
    } else {
      setItems(registeredPrograms);
    }
  };

  const resetSearchBar = useCallback(() => {
    setIsSearched(false);
    setSearchValue("");
  }, []);

  // Filtered programs according to the categories in the sidebar
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFiltered, setIsFiltered] = useState(!!cat);

  const [searchValue, setSearchValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState();
  const showModal = item => {
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
          reset={resetSearchBar}
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
            user?.isResearcher() && (
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
            )
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
            size="large"
            placeholder="input search text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onSearch={_ => {
              setIsSearched(true);
              isFiltered
                ? setSearchedItems(
                    filteredItems.filter(item =>
                      item.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    )
                  )
                : setSearchedItems(
                    allPrograms.filter(item =>
                      item.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    )
                  );
            }}
            style={{ width: 700 }}
          />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
            }}
          >
            {!allPrograms ? (
              <Col>
                <Row align="middle" style={{ minHeight: "100vh" }}>
                  <Col span={8} offset={10}>
                    <CircularProgress size="9rem" thickness="3" />
                  </Col>
                </Row>
              </Col>
            ) : (
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  pageSize: 7,
                }}
                dataSource={
                  isSearched
                    ? searchedItems
                    : isFiltered
                    ? filteredItems
                    : items
                }
                renderItem={item => (
                  <ListItem item={item} showModal={showModal} />
                )}
              />
            )}
            {isModalVisible && (
              <ItemDetailsModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                fetchAllPrograms={fetchAllPrograms}
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
