import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
  largeIcon: {
    width: 80,
    height: 80,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src={require("../../images/productCurvyLines.png")}
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <AccountCircleOutlinedIcon className={classes.largeIcon} />
              <Typography variant="h6" className={classes.title}>
                Sign up for Free
              </Typography>
              <Typography variant="h5">
                {
                  "Join Singapore's very own centralised survey platform. It's fast, easy and 100% free!"
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <AssignmentOutlinedIcon className={classes.largeIcon} />
              <Typography variant="h6" className={classes.title}>
                Complete Surveys Online
              </Typography>
              <Typography variant="h5">
                {"Receive surveys by email and complete them online."}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <MonetizationOnOutlinedIcon className={classes.largeIcon} />
              <Typography variant="h6" className={classes.title}>
                Get Rewarded!
              </Typography>
              <Typography variant="h5">
                {"Earn cold hard cash for each survey you complete."}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
