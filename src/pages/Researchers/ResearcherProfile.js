import React, { Fragment, useEffect, useState, useContext } from "react";
import { Layout, List, PageHeader, Divider, Col, Row } from "antd";
import { UserContext } from "../../util/UserProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
const { Content } = Layout;

const personal = [
  ["Name: ", "firstName"],
  ["Organization: ", "organization"],
  ["Research Area: ", "researchArea"],
  ["Short Introduction: ", "shortIntroduction"],
];

const security = ["Email Address: ", "Password: "];

const ResearcherProfile = () => {
  const user = useContext(UserContext);
  const [data, setData] = useState({});
  console.log(data);

  useEffect(() => {
    setData(user ? user.data : {});
  }, [user]);

  return (
    <Fragment>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ padding: 24 }} />
        <PageHeader title="Personal Details" />
      </Layout>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ padding: 24 }}>
          {!data ? (
            <Col>
              <Row align="middle" style={{ minHeight: "100vh" }}>
                <Col span={8} offset={10}>
                  <CircularProgress size="9rem" thickness="3" />
                </Col>
              </Row>
            </Col>
          ) : (
            <div>
              {personal.map(title => {
                return (
                  <Fragment>
                    <h3>
                      <b>{title[0]}</b>
                      {data[title[1]]}
                    </h3>
                    <br />
                  </Fragment>
                );
              })}
            </div>
          )}
        </Content>
      </Layout>
      <div>
        Information:
        <b>{console.log(data?.email)}</b>
      </div>
      <Layout style={{ marginLeft: 200 }}>
        <PageHeader title="Security settings" />
      </Layout>
      <Layout style={{ marginLeft: 110 }}>
        <Divider orientation="left">
          {/*<List*/}
          {/*  size="large"*/}
          {/*  dataSource={security}*/}
          {/*  renderItem={item => <List.Item>{item}</List.Item>}*/}
          {/*/>*/}
        </Divider>
      </Layout>
    </Fragment>
  );
};
export default ResearcherProfile;
