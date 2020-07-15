import React, { Fragment, useState } from "react";
import { Modal, Tag, Checkbox } from "antd";
import { tagMapping } from "./ListItem";

const dummyData = {
  researcher: "Mcflurry",
  organization: "National University of Pots and Pans",
  email: "researcher@gmail.com",
  participants: 15,
};

const ItemDetailsModal = ({ isModalVisible, setModalVisible, item }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  //TODO: Check if user has registered for the event
  const [isRegistered, setIsRegistered] = useState(false);

  const handleOk = () => {
    //TODO: +1 to "participants" property of the item
    //TODO: Add program to "registered programs" of volunteer
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onChange = () => {
    if (isDisabled === true && isRegistered === false) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Apply"
      cancelText="Back"
      okButtonProps={{ disabled: isDisabled }}
    >
      <Fragment>
        <h1>{item.title}</h1>
        {isRegistered && (
          <p>
            <i>You have already registered for this program.</i>
          </p>
        )}
        <p>
          {item.tags.map((tag) => {
            return <Tag color={tagMapping[tag]}>{tag}</Tag>;
          })}
          <br />
        </p>

        <p>
          {Object.entries(item.details).map(([key, value]) => {
            key = key.charAt(0).toUpperCase() + key.slice(1);
            return (
              <Fragment>
                <b>{key}:</b> {value}
                <br />
              </Fragment>
            );
          })}
        </p>

        <p>
          {/*TODO: Add property "participants" to each item*/}
          <b>No. of Participants: </b> {dummyData.participants} / {item.number}
        </p>

        <div>
          <Checkbox onChange={onChange}>
            I consent to providing my personal data for the entire duration of
            the research study. I would also agree to receive important updates
            pertaining to matters related to the event. All personal information
            will be kept confidential and be used only for the purpose of the
            research study. I understand that should I wish to withdraw my
            consent for the organising committee to contact me for the purposes
            stated above, I could notify <b>{dummyData.researcher}</b> from{" "}
            <b>{dummyData.organization}</b>, in writing to{" "}
            <b>{dummyData.email}</b>. The organising committee will then remove
            my personal information from their database, and I allow 7 business
            days for my withdrawal of consent to take effect.
          </Checkbox>
        </div>
      </Fragment>
    </Modal>
  );
};

export default ItemDetailsModal;
