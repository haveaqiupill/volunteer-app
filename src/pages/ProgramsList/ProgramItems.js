import React, { Fragment, useState } from "react";
import Button from "../../modules/components/Button";
import { Input, Layout, List, Tabs, PageHeader, Space, Avatar } from "antd";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { useNavigate } from "@reach/router";

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
    avatar: "https://image.flaticon.com/icons/svg/3163/3163231.svg",
    description:
      "This is part of a research study to investigate the correlation between eating habits and stress levels.",
    content:
      "A team of student researchers from the Faculty of Science of XXX University wants to investigate the correlation between eating habits and stress levels as part of their FYP.",
  });
}

const ProgramItems = () => {
  const [current, setCurrent] = useState("1");
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <Fragment>
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
              <List.Item
                key={item.id}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                  <Fragment>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      component="a"
                      onClick={() => navigate(`/programs/${item.id}`)}
                    >
                      Apply
                    </Button>
                  </Fragment>,
                ]}
                extra={
                  <img
                    height={200}
                    alt="logo"
                    src="https://previews.123rf.com/images/fleren/fleren1708/fleren170800019/84888074-cute-food-seamless-pattern-childish-vector-illustration-food-illustration-for-kids-menu-wallpapper-c.jpg"
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.title}
                  description={item.description}
                />
                {item.content}
                <br />
                <br />
                {Object.entries(item.details).map(([key, value]) => {
                  key = key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <Fragment>
                      <b>{key}:</b> {value}
                      <br />
                    </Fragment>
                  );
                })}
              </List.Item>
            )}
          />
        </Content>
      </PageHeader>
    </Fragment>
  );
};

export default ProgramItems;
