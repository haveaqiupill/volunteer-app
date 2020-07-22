import React, { Fragment, useEffect, useState, useContext } from "react";
import { Layout, List, PageHeader, Divider} from "antd";
import { UserContext } from "../../util/UserProvider";
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
    const user = useContext(UserContext);
    const [userData, setUserData] = useState(user?.data);

    useEffect(() => {
        getUserData();
    }, [user]);

    const getUserData = async () => {
        try {
            const tmp = await user?.data;
            setUserData(tmp);
        } catch (error) {
            console.log("Error getting researcher's data", error);
        }
    };

    const holdDetails = [
        userData?.firstName,
        userData?.organization,
        userData?.researchArea,
        userData?.shortIntroduction
    ];


    console.log(holdDetails);

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
                    //TODO: Feed appropriate data into holdDetails and renderItem for the information of the user to be displayed on the profile page.
                    dataSource={holdDetails}
                    renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Divider>
            </Layout>
                <div>
                    Information:
                <b>{console.log(user?.email)}</b>
                </div>
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
