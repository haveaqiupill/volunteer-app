import React, { Fragment, useState } from "react";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";

import { Field, Form, FormSpy } from "react-final-form";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Tag } from "antd";
import { required } from "../../modules/form/validation";
import { tagMapping } from "../ProgramsList/ListItem";
import { categories } from "../ProgramsList/ProgramItemsSider";
import AppForm from "../../modules/views/AppForm";
import Typography from "../../modules/components/Typography";
import RFTextField from "../../modules/form/RFTextField";
import FormFeedback from "../../modules/form/FormFeedback";
import FormButton from "../../modules/form/FormButton";
import AppFooter from "../../modules/views/AppFooter";

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
  const [selectedTags, setSelectedTags] = useState("");

  const validate = (values) => {
    return required(
      ["title", "date", "venue", "duration", "compensation", "description"],
      values
    );
  };

  const handleTags = (tag) => {
    setSelectedTags(tag);
  };

  React.useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

  const handleSubmit = (values) => {
    const {
      title,
      date,
      venue,
      duration,
      compensation,
      description,
      tags,
    } = values;

    try {
      console.log(values);
      // TODO: POST program details
    } catch (error) {
      // TODO: show the error message to user
    }
    setSent(true);
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
                    label="Date"
                    name="date"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    label="Venue"
                    name="venue"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    label="Duration"
                    name="duration"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    fullWidth
                    label="Compensation (per hour)"
                    name="compensation"
                    required
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
              <TextField
                fullWidth
                disabled={submitting || sent}
                select
                name="tags"
                label="Tags"
                margin="normal"
                value={selectedTags}
                onChange={(e) => handleTags(e.target.value)}
              >
                {categories.map((tagName, i) => {
                  return (
                    <MenuItem key={i} value={tagName}>
                      <Tag color={tagMapping[tagName]}>{tagName}</Tag>
                    </MenuItem>
                  );
                })}
              </TextField>
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
