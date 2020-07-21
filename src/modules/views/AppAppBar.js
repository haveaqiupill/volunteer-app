import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import { UserContext } from "../../util/UserProvider";
import Auth from "../../util/Authentication";

const styles = theme => ({
  title: {
    fontSize: 16,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    flex: 0,
    display: "flex",
    justifyContent: "flex-end",
  },
  item: {
    marginLeft: theme.spacing(3),
  },
  logo: {
    height: 50,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 12,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;
  const user = useContext(UserContext);

  return (
    <div>
      <AppBar position="fixed" style={{ height: "9vh" }}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <a href="/">
              <img
                src={require("../../images/logo.png")}
                alt="logo"
                className={classes.logo}
              />
            </a>
          </div>
          <div className={classes.item}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/"
            >
              {"Home"}
            </Link>
          </div>
          <div className={classes.item}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/programs"
            >
              {"Programs"}
            </Link>
          </div>
          <div className={classes.right}>
            {/* Feel free to change this, adding this here so I can easily see logged in user */}
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
            >
              {user?.email}
            </Link>
            {user && user?.researcher && (
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
                href="/researcher"
              >
                {"Profile"}
              </Link>
            )}
            {!user && (
              <>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/sign-in"
                >
                  {"Login"}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/sign-up"
                >
                  {"Sign Up"}
                </Link>
              </>
            )}
            {user && (
              <Link
                variant="h6"
                underline="none"
                className={classes.rightLink}
                onClick={Auth.signOut}
              >
                {"Sign Out"}
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
