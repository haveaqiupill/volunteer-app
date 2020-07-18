import React, { Fragment, useState } from "react";
import { Modal, Table} from "antd";

const dummyData = {
  researcher: "Mcflurry",
  organization: "National University of Pots and Pans",
  email: "researcher@gmail.com",
  participants: 15,
};

const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Faculty',
    dataIndex: 'faculty',
  }];
  
const data = [];
  for (let i = 0; i < 45; i++) {
    data.push({
      key: i,
      name: `John ${i}`,
      age: 18,
      faculty: `Psychology`,
    });
}

const ViewVolunteersModal = ({ isModalVisible, setModalVisible, item }) => {
    
    const handleOk = () => {
    //TODO: +1 to "participants" property of the item
    //TODO: Add program to "registered programs" of volunteer
    setModalVisible(false);
    };

    const handleCancel = () => {
    setModalVisible(false);
    };

    const [selectedRows, setRowKeys] = useState([]);

    const finalSelect = [];

    const onSelectChange = (selectedRowKeys_1) => {
    setRowKeys( selectedRowKeys_1 );
    const finalSelect = selectedRowKeys_1;
    console.log('selectedRows changed: ', selectedRows);
    console.log('selectedRowKeys changed_1: ', selectedRowKeys_1);
    console.log('selectedRowKeys changed_all: ', finalSelect);
    }

    const rowSelection = {
    selectedRows,
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
        setRowKeys( [...Array(46).keys()], // 0...45
        );
        },
    },],
    };

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
                {/*TODO: Add property "participants" to each item*/}
                <b>No. of Participants: </b> {dummyData.participants} / {item.number}
            </p>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </Fragment>
        </Modal>
        );

    
};

export default ViewVolunteersModal;


