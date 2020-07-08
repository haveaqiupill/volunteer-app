import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

export default function CheckboxLabels() {
  
    const [selectedValue, setSelectedValue] = React.useState('a');
  
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    }
  
  return (
    <div>
      <FormControlLabel
        control = {
        <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="Reseacher"
        inputProps={{ 'aria-label': 'A' }}
      />
        }
        label="Researcher"
      />
      <FormControlLabel
        control = {
        <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="Volunteer"
        inputProps={{ 'aria-label': 'B' }}
      />
        }
        label="Volunteer"
      />
    </div>
  )
 }