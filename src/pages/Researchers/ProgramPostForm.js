import React, { Fragment, useState } from "react";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";

import { Field, Form, FormSpy } from "react-final-form";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { notification } from "antd";
import { required } from "../../modules/form/validation";
import { categories, locations } from "../ProgramsList/ProgramItemsSider";
import AppForm from "../../modules/views/AppForm";
import Typography from "../../modules/components/Typography";
import RFTextField from "../../modules/form/RFTextField";
import FormFeedback from "../../modules/form/FormFeedback";
import FormButton from "../../modules/form/FormButton";
import AppFooter from "../../modules/views/AppFooter";

const allTags = [...categories, ...locations];
const programType = ["Survey", "Activity", "Others"];
notification.config({ placement: "bottomRight" });
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

/**
 * Creates a form for researchers to post a new program.
 * @returns {*}
 * @constructor
 */
const ProgramPostForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const validate = (values) => {
    return required(
      [
        "title",
        "date",
        "venue",
        "duration",
        "compensation",
        "type",
        "number",
        "description",
      ],
      values
    );
  };

  const handleTags = (event) => {
    event.persist();
    setSelectedTags(
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const handleSubmit = (values) => {
    const {
      title,
      date,
      venue,
      duration,
      compensation,
      type,
      number,
      description,
    } = values;

    try {
      console.log(values);
      console.log(selectedTags);
      // TODO: POST program details
    } catch (error) {
      notification.open({
        message: "Error!",
        description: error.message,
      });
    }
    setSent(true);
    notification.open({
      message: "Success!",
      description: "New post created.",
    });
    navigate(`/programs`);
  };
  return (
    <Fragment>
      <AppForm>
        <Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Create Program
          </Typography>
        </Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={12}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    fullWidth
                    disabled={submitting || sent}
                    label="Program Title"
                    name="title"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    fullWidth
                    disabled={submitting || sent}
                    label="Date"
                    name="date"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    disabled={submitting || sent}
                    label="Venue"
                    name="venue"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    disabled={submitting || sent}
                    label="Duration"
                    name="duration"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    disabled={submitting || sent}
                    label="Compensation (per hour)"
                    name="compensation"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    required
                    disabled={submitting || sent}
                    select
                    name="type"
                    label="Type of Program"
                    margin="normal"
                  >
                    {programType.map((type, i) => {
                      return (
                        <MenuItem key={i} value={type}>
                          {type}
                        </MenuItem>
                      );
                    })}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    required
                    disabled={submitting || sent}
                    name="number"
                    label="Participants required"
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Field
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                multiline={true}
                rows={4}
                label="Description"
                margin="normal"
                name="description"
                required
              />
              <Field
                component={RFTextField}
                fullWidth
                disabled={submitting || sent}
                select
                name="tags"
                label="Tags"
                margin="normal"
                SelectProps={{
                  multiple: true,
                  onChange: handleTags,
                  value: selectedTags,
                }}
              >
                {allTags.map((tagName, i) => {
                  return (
                    <MenuItem key={i} value={tagName}>
                      {tagName}
                    </MenuItem>
                  );
                })}
              </Field>
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
                {submitting || sent ? "In progress…" : "Create"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </Fragment>
  );
};

export default ProgramPostForm;
