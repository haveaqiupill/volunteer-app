import React, { Fragment } from "react";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import Button from "../../modules/components/Button";
import { Tag, Avatar, List, Space } from "antd";

export const tagMapping = {
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

const ResearcherItem = ({ item, showModal }) => {
  const getDateString = date => {
    if (typeof date === "string") {
      return date;
    } else {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toDate().toLocaleString("en-GB", options);
    }
  };

  return (
    <List.Item
      key={item.id}
      actions={[
        <Space>
          <StarOutlined />
          {item.likedBy?.length ?? 0}
        </Space>,
        <Space>
          <MessageOutlined />
          {0}
        </Space>,
        <Fragment>
          <Button
            color="primary"
            variant="contained"
            size="small"
            component="a"
            onClick={() => showModal(item)}
          >
            View volunteers
          </Button>
        </Fragment>,
      ]}
      extra={
        <img
          height={200}
          alt="logo"
          //TODO: Render image based on organization of researcher who posted the program
          src={require(item.details.venue === "NUS"
            ? "../../images/nus_logo.png"
            : item.details.venue === "NTU"
            ? "../../images/ntu_logo.png"
            : item.details.venue === "SMU"
            ? "../../images/smu_logo.png"
            : "../../images/questionmark.png")}
        />
      }
    >
      <List.Item.Meta
        //TODO: Render avatar based on type of program
        avatar={<Avatar src={item.avatar} />}
        title={
          <Fragment>
            <Space>
              {item.title}
              {item.tags.map(tag => {
                return (
                  <Tag key={tag} color={tagMapping[tag]}>
                    {tag}
                  </Tag>
                );
              })}
            </Space>
          </Fragment>
        }
        description={item.description}
      />
      <b>Date:</b> {getDateString(item.details.date)}
      <br />
      <b>Duration:</b> {item.details.duration}
      <br />
      <b>Venue:</b> {item.details.venue}
      <br />
      <b>Compensation:</b> {item.details.compensation}
      <br />
    </List.Item>
  );
};

export default ResearcherItem;
