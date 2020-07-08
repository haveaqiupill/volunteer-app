import React, { Fragment } from "react";
import AppAppBar from "../modules/views/AppAppBar";
import AppFooter from "../modules/views/AppFooter";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const imgUrl =
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2852&q=80";

const dummyData = [
  {
    id: "1",
    title: "Survey Regarding Mental Health",
    researcher: "Professor X",
  },
  {
    id: "2",
    title: "Survey Regarding Mental Health",
    researcher: "Professor X",
  },
  {
    id: "3",
    title: "Survey Regarding Mental Health",
    researcher: "Professor X",
  },
  {
    id: "4",
    title: "Survey Regarding Mental Health",
    researcher: "Professor X",
  },
  {
    id: "5",
    title: "Survey Regarding Mental Health",
    researcher: "Professor X",
  },
];

const ListView = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        container
        spacing={6}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid item xs={12}>
          <AppAppBar />
        </Grid>
        <Grid item xs={12}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div">Programs</ListSubheader>
            </GridListTile>
            {dummyData.map((program) => (
              <GridListTile key={program.id}>
                <img src={imgUrl} alt={program.title} />
                <GridListTileBar
                  title={program.title}
                  subtitle={<span>by: {program.researcher}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${program.title}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Grid>
      <AppFooter />
    </Fragment>
  );
};

export default ListView;
