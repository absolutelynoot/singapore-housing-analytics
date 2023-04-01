import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const MyForm = () => {
  const [formData, setFormData] = useState({
    town: '',
    flat_type: '',
    flat_model: '',
    street_name: '',
    storey_range: '',
    remaining_lease: '',
    floor_area_sqm: '',
    year: '',
    month: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Do something with the form data

    fetch('http://127.0.0.1:5000/hdb/predict_price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
    //   .then(result => setPredictedPrice(result.predicted_price))
      .catch(error => console.log(error))
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="town"
            label="Town"
            fullWidth
            value={formData.town}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="flat_type"
            label="Flat Type"
            fullWidth
            value={formData.flat_type}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="flat_model"
            label="Flat Model"
            fullWidth
            value={formData.flat_model}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="street_name"
            label="Street Name"
            fullWidth
            value={formData.street_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="storey_range"
            label="Storey Range"
            fullWidth
            value={formData.storey_range}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="remaining_lease"
            label="Remaining Lease"
            fullWidth
            value={formData.remaining_lease}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="floor_area_sqm"
            label="Floor Area Sqm"
            fullWidth
            value={formData.floor_area_sqm}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="year"
            label="Year"
            fullWidth
            value={formData.year}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="month"
            label="Month"
            fullWidth
            value={formData.month}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MyForm;
