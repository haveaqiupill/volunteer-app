import withRoot from "../modules/withRoot";
// --- Post bootstrap -----
import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "../modules/components/Typography";
import AppFooter from "../modules/views/AppFooter";
import AppAppBar from "../modules/views/AppAppBar";
import AppForm from "../modules/views/AppForm";
import { required } from "../modules/form/validation";
import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";
import FormFeedback from "../modules/form/FormFeedback";
import Db from "../util/Database";
import { UserContext } from "../util/UserProvider";
import MenuItem from "@material-ui/core/MenuItem";
import { notification } from "antd";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

const organizations = ["NUS", "NTU", "SMU", "Others"];

function SignUpResearcher() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const userId = useContext(UserContext)?.uid;
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = required(
      ["organization", "researchArea", "shortIntroduction"],
      values
    );

    return errors;
  };

  const handleSubmit = async values => {
    try {
      await Db.addResearchData(userId, values);
    } catch (error) {
      notification.open({
        message: "Error!",
        description: error.message,
      });
    }
    setSent(true);
    notification.open({
      message: "Success!",
      description: "Details Updated",
    });
    navigate('/');
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/sign-in" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    fullWidth
                    select
                    label="Organization"
                    name="organization"
                    required
                  >
                    {organizations.map((organization, i) => {
                      return (
                        <MenuItem key={i} value={organization}>
                          {organization}
                        </MenuItem>
                      );
                    })}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    fullWidth
                    label="Research Area"
                    name="researchArea"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    label="Short Introduction"
                    name="shortIntroduction"
                    required
                  />
                </Grid>
              </Grid>
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign Up"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUpResearcher);
