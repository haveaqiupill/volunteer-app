import React, { Fragment, useState, useEffect, useContext } from "react";
import { Modal, Tag, Checkbox } from "antd";
import { tagMapping } from "./ListItem";
import Db from "../../util/Database";
import { UserContext } from "../../util/UserProvider";

const ItemDetailsModal = ({
  isModalVisible,
  setModalVisible,
  fetchAllPrograms,
  item,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [programsResearcher, setProgramsResearcher] = useState({
    firstName: "the",
    lastName: "Researcher",
    organization: "the Researcher's Organization",
    email: "the Researcher's email",
  });

  const user = useContext(UserContext);

  useEffect(() => {
    getResearcherData();
    checkIfUserIsRegisted();
  }, []);

  const getResearcherData = async () => {
    try {
      const researcherData = await Db.getUserData(item.researcherUserId);
      setProgramsResearcher(researcherData);
    } catch (error) {
      console.log("Error getting researcher's data", error);
    }
  };

  const checkIfUserIsRegisted = async () => {
    setIsRegistered(item.volunteerUserIds?.includes(user?.uid) ?? false);
  };

  const handleOk = async () => {
    if (user == null) {
      // TODO: Show some prompt to ask user to sign up first before applying
      console.log("User not logged in");
      return;
    }

    // TODO: Show some front end notification similar to that in SignUpVolunteer
    // when successfully applied for program or error?
    try {
      await Db.applyProgram(item.id, user?.uid);
      // fetch all program data from backend again
      // to ensure user cannot apply for the same program again
      fetchAllPrograms();
      setModalVisible(false);
    } catch (error) {
      console.log("Error while applying for program", error);
    }
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
          {item.tags.map(tag => {
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
          <b>No. of Participants: </b>
          {item.volunteerUserIds?.length ?? 0} / {item.number}
        </p>

        <div>
          <Checkbox onChange={onChange}>
            I consent to providing my personal data for the entire duration of
            the research study. I would also agree to receive important updates
            pertaining to matters related to the event. All personal information
            will be kept confidential and be used only for the purpose of the
            research study. I understand that should I wish to withdraw my
            consent for the organising committee to contact me for the purposes
            stated above, I could notify{" "}
            <b>{`${programsResearcher.firstName} ${programsResearcher.lastName}`}</b>{" "}
            from <b>{programsResearcher.organization}</b>, in writing to{" "}
            <b>{programsResearcher.email}</b>. The organising committee will
            then remove my personal information from their database, and I allow
            7 business days for my withdrawal of consent to take effect.
          </Checkbox>
        </div>
      </Fragment>
    </Modal>
  );
};

export default ItemDetailsModal;
