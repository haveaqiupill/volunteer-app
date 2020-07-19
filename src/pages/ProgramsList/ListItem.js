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
                return <Tag color={tagMapping[tag]}>{tag}</Tag>;
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

export default ListItem;
