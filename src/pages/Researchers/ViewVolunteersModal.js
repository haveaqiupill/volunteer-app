import React, { Fragment, useState, useEffect } from "react";
import { Modal, Table } from "antd";
import Db from "../../util/Database";

const ViewVolunteersModal = ({ isModalVisible, setModalVisible, item }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const volunteersData = await Db.getUsersData(item.volunteerUserIds);
    setData(parseVolunteersData(volunteersData));
  };

  const parseVolunteersData = data => {
    return Object.entries(data).map(([uid, data]) => {
      return { uid, name: `${data.firstName} ${data.lastName}`, ...data };
    });
  };

  const handleOk = () => {
    // TODO: do something about selected volunteers
    console.log("Selected volunteers: ", selectedRows);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    onChange: onSelectChange,
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Organization",
      dataIndex: "organization",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
    },
  ];

  return (
    <Modal
      width="600"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add selected volunteers"
      cancelText="Back"
    >
      <Fragment>
        <h1>{item.title}</h1>
        <p>
          <b>No. of Participants: </b> {item.volunteerUserIds?.length ?? 0} /{" "}
          {item.number}
        </p>
        <Table
          rowSelection={rowSelection}
          columns={tableColumns}
          rowKey={rowData => rowData.uid}
          dataSource={data}
          loading={data == null}
        />
      </Fragment>
    </Modal>
  );
};

export default ViewVolunteersModal;
