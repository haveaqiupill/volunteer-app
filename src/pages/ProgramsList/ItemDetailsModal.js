import React from "react";
import { Modal } from "antd";
import { useNavigate } from "@reach/router";

const ItemDetailsModal = ({ isModalVisible, setModalVisible, item }) => {
  const navigate = useNavigate();

  const handleOk = (e) => {
    console.log(e);
    setModalVisible(false);
    navigate(`/programs/${item.id}`);
  };

  const handleCancel = (e) => {
    console.log(e);
    setModalVisible(false);
  };

  return (
    <Modal
      title={item.title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Apply"
      cancelText="Back"
      okButtonProps={{ type: "danger" }}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ItemDetailsModal;
