import React, { Fragment } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import Button from "../../modules/components/Button";
import { Tag, Avatar, List, Space } from "antd";

const ListItem = ({ item, showModal }) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  //Index of random photo to be inserted
  const index = Math.floor(Math.random() * 3);

  const tagMapping = {
    Psychology: "magenta",
    Healthcare: "red",
    Sports: "volcano",
    Food: "orange",
    Education: "lime",
    "Arts & Heritage": "green",
    Lifestyle: "cyan",
    Environment: "blue",
    Elderly: "purple",
  };

  return (
    <List.Item
      key={item.id}
      actions={[
        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
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
            onClick={() => showModal(item)}
          >
            Details
          </Button>
        </Fragment>,
      ]}
      extra={
        <img
          height={200}
          alt="logo"
          src={require(index === 0
            ? "../../images/nus_logo.png"
            : index === 1
            ? "../../images/ntu_logo.png"
            : "../../images/smu_logo.png")}
        />
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={item.avatar} />}
        title={
          <Fragment>
            <Space>
              {item.title}
              {item.tags.map((tag) => {
                return <Tag color={tagMapping[tag]}>{tag}</Tag>;
              })}
            </Space>
          </Fragment>
        }
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
  );
};

export default ListItem;
