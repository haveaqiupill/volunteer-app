import React, { Fragment, useState, useEffect, useContext } from "react";
import { Layout, List, PageHeader } from "antd";
import ResearcherItem from "./ResearcherItem";
import ViewVolunteersModal from "./ViewVolunteersModal";
import Db from "../../util/Database";
import { UserContext } from "../../util/UserProvider";

const { Content } = Layout;

const ResearcherPostings = () => {
  const user = useContext(UserContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState();
  const showModal = item => {
    setModalItem(item);
    setModalVisible(true);
  };

  const [postings, setPostings] = useState();

  useEffect(() => {
    getPostings();
  }, []);

  const getPostings = async () => {
    const programs = await Db.getResearchersPrograms(user?.uid);
    setPostings(programs);
  };

  return (
    <Fragment>
      <Layout style={{ marginLeft: 200 }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
          }}
        />
        <PageHeader title="Your postings" />
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 7,
          }}
          dataSource={postings}
          renderItem={item => (
            <ResearcherItem item={item} showModal={showModal} />
          )}
        />
        {isModalVisible && (
          <ViewVolunteersModal
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            item={modalItem}
          />
        )}
      </Layout>
    </Fragment>
  );
};

export default ResearcherPostings;
