import withRoot from "../modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "../modules/components/Typography";
import AppFooter from "../modules/views/AppFooter";
import AppAppBar from "../modules/views/AppAppBar";
import AppForm from "../modules/views/AppForm";
import { email, required } from "../modules/form/validation";
import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";
import FormFeedback from "../modules/form/FormFeedback";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Authentication from "../util/Authentication";
import { useNavigate } from "@reach/router";

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

function SignUp() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const [selectedValue, setSelectedValue] = React.useState('researcher');
  
  const handleChange = (event) => {
      setSelectedValue(event.target.value);
      console.log(event.target.value);
    }

  const navigate = useNavigate();
  
  const handleSubmit = (values) => {
    // TODO: get radio buttons value as userType
    const { email, password, firstName, lastName, userType } = values;
    
    try {
      Authentication.signUp(email, password, firstName, lastName, userType);
    } catch (error) {
    // TODO: show the error message to user
    }

    if(selectedValue==="researcher"){
      navigate(`/sign-up/researcher`);
    }
    else{
      navigate(`/sign-up/volunteer`);
    }
    
    // TODO: Redirect base on userType
    setSent(true);
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
            <Link href="/premium-themes/onepirate/sign-in/" underline="always">
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
                <Grid item xs={12} sm={7}>
                  <Typography variant="h5">I am a...</Typography>
                </Grid>
                <Grid item xs={3} sm={12}>
                <FormControlLabel
                  value="researcher"
                  control = {
                  <Radio
                  checked={selectedValue === 'researcher'}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'A' }}
                />
                }
                  label="Researcher"
                />
                <FormControlLabel
                  value="volunteer"
                  control = {
                  <Radio
                  checked={selectedValue === 'volunteer'}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'B' }}
                />
                  }
                  label="Volunteer"
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="fname"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="lname"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>

              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
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
                {submitting || sent ? "In progress…" : "Next"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
