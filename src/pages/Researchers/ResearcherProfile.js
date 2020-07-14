import React, { Fragment } from "react";
import { Layout, List, PageHeader, Divider} from "antd";
import ResearcherSider from "./ResearcherSider";

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
            <ResearcherSider/>
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
                <Divider orientation="center">
                    <List
                    size="large"
                    dataSource={personal}
                    renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Divider>
                <PageHeader
                    title="Security settings"
                />
                <Divider orientation="center">
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
