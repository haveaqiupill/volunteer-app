import React, { Fragment, useState, useContext, useEffect } from "react";
import { MessageOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import Button from "../../modules/components/Button";
import { Tag, Avatar, List, Space } from "antd";
import Db from "../../util/Database";
import { UserContext } from "../../util/UserProvider";

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

const ListItem = ({ item, showModal }) => {
  const user = useContext(UserContext);

  const getInitialIsLikedByUser = () =>
    item.likedBy?.includes(user?.uid) ?? false;
  const getInitialLikeCount = () => item.likedBy?.length ?? 0;

  const [liked, setLiked] = useState(getInitialIsLikedByUser());
  const [likeCount, setLikeCount] = useState(getInitialLikeCount());

  // re-render after getting user context
  useEffect(() => {
    setLiked(getInitialIsLikedByUser());
    setLikeCount(getInitialLikeCount());
  }, [user]);

  // liked and likeCount are local states so that user actions update UI immediately
  // and does not depend on when the db is updated
  // users who press like but are not signed in will not affect backend
  const toggleLike = () => {
    liked
      ? Db.unlikeProgram(item.id, user?.uid)
      : Db.likeProgram(item.id, user?.uid);

    const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setLiked(!liked);
  };

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
        <div onClick={toggleLike}>
          <Space>
            {liked ? <StarFilled /> : <StarOutlined />}
            {likeCount}
          </Space>
        </div>,
        <Space>
          <MessageOutlined />
          {"0, be the first!"}
        </Space>,
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
        avatar={
          <Avatar
            src={
              item.type === "Activity"
                ? "https://image.flaticon.com/icons/svg/3057/3057223.svg"
                : item.type === "Survey"
                ? "https://image.flaticon.com/icons/svg/1632/1632670.svg"
                : "https://image.flaticon.com/icons/svg/3203/3203867.svg"
            }
          />
        }
        title={
          <Fragment>
            <Space>
              {item.title}
              {item.tags.map(tag => {
                return <Tag color={tagMapping[tag]}>{tag}</Tag>;
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

export default ListItem;
