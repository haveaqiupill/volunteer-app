import React, { Fragment } from "react";
import { Layout, List, PageHeader, Divider} from "antd";

const { Content } = Layout;

const personal = [
    'Name: ',
    'Organization: ',
    'Research Area: ',
    'Short Introduction: '
];

const security = [
    'Email Address: ',
    'Password: '
]

const ResearcherProfile = () => {
   
    return (
        <Fragment>
            <Layout style={{ marginLeft: 200 }}>
                <Content
                    style={{
                    padding: 24,
                    margin: 0,
                    }}
                />
                <PageHeader
                    title="Personal Details"
                />
            </Layout>
            <Layout style={{ marginLeft: 110 }}>
                <Divider orientation="left">
                    <List
                    size="large"
                    dataSource={personal}
                    renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Divider>
            </Layout>
            <Layout style={{ marginLeft: 200 }}>
                <PageHeader
                    title="Security settings"
                />
            </Layout>
            <Layout style={{ marginLeft: 110 }}>
                <Divider orientation="left">
                    <List
                    size="large"
                    dataSource={security}
                    renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Divider>
            </Layout>
        </Fragment>
    );
}
export default ResearcherProfile;
