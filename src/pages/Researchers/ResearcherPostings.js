import React, { Fragment} from "react";
import { Layout, List, PageHeader } from "antd";
import ResearcherItem from "./ResearcherItem";

// The data below is for testing and will be deleted once the API is up
const dummyData = [];

const { Content } = Layout;

const categories = [
  "Psychology",
  "Healthcare",
  "Sports",
  "Food",
  "Education",
  "Arts & Heritage",
  "Lifestyle",
  "Environment",
  "Elderly",
];

const locations = ["North", "South", "East", "West", "Central"];

for (let i = 0; i < 3; i++) {
  dummyData.push({
    id: i,
    title: `Survey ${i}`,
    //depends on type of program
    avatar: "https://image.flaticon.com/icons/svg/3163/3163231.svg",
    //depends on organization of researcher
    image: Math.floor(Math.random() * 3),
    description:
      "This is part of a research study to investigate the correlation between eating habits and stress levels.",
    details: {
      date: "2020-11-12",
      compensation: "$10/hr",
      venue: "NTU North Spine ...",
      duration: "2 hours",
    },
    tags: [
      categories[Math.floor(Math.random() * categories.length)],
      locations[Math.floor(Math.random() * locations.length)],
    ],
    number: 50,
    researcher: "Student ABC",
  });
}
// The data above is for testing and will be deleted once the API is up

const ResearcherPostings = () => {

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
                    title="Your postings"
                />
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 7,
                    }}
                    dataSource={dummyData}
                    renderItem={(item) => (
                        <ResearcherItem item={item} />
                    )}
                />
            </Layout>
        </Fragment>
    );
}
export default ResearcherPostings;
