import React, { Fragment } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import Button from "../../modules/components/Button";
import { Tag, Avatar, List, Space } from "antd";
import Db from "../../util/Database";

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
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  // TODO: Remove this and show the stuff in modal
  const printVolunteersData = async () => {
    const volunteersData = await Db.getUsersData(item.volunteerUserIds);
    console.log(volunteersData);
    window.alert(JSON.stringify(volunteersData));
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
            // onClick={printVolunteersData}
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

export default ResearcherItem;
