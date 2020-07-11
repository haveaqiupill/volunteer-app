import { PageHeader } from "antd";
import React, { Fragment } from "react";

const ItemForm = ({ id }) => {
  const dummyData = {
    id: id,
    title: `Survey ${id}`,
    details: {
      date: "2020-11-12",
      compensation: "$10/hr",
      venue: "NTU North Spine ...",
      duration: "2 hours",
    },
    avatar: "https://image.flaticon.com/icons/svg/3163/3163231.svg",
    description:
      "This is part of a research study to investigate the correlation between eating habits and stress levels.",
    content:
      "A team of student researchers from the Faculty of Science of XXX University wants to investigate the correlation between eating habits and stress levels as part of their FYP.",
  };

  return (
    <Fragment>
      <PageHeader title="Programs" className="site-page-header">
        This is item {id}
      </PageHeader>
    </Fragment>
  );
};

export default ItemForm;
