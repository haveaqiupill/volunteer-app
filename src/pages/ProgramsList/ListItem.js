import React, { Fragment } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import Button from "../../modules/components/Button";
import { Avatar, List, Space } from "antd";

const ListItem = ({ item, showModal }) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

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
  );
};

export default ListItem;
