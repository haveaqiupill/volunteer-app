import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

export default function CheckboxLabels() {

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <Grid item xs={6}>
      <FormControlLabel
        control={
        <Checkbox 
            checked={state.checkedA} 
            onChange={handleChange} 
            name="checkedA" 
        />
        }
        label="Researcher"
      />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
            control={
            <Checkbox
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
            />
            }
            label="Volunteer"
        />
        </Grid>
    </FormGroup>
  );
}
