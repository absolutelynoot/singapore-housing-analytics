import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';


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
  const [predictedPrice, setPredictedPrice] = useState(null);

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
      .then(data => {
        console.log(data);
        // format data.prediction to 0 decimal place with comma
        const formattedPrediction = data.prediction.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        setPredictedPrice(formattedPrediction);
      })
      .catch(error => console.log(error))

  };

  // const options = [
  //   { value: "Ang Mo Kio", label: "Ang Mo Kio" },
  //   { value: "Bedok", label: "Bedok" },
  //   { value: "Bishan", label: "Bishan" },
  //   { value: "Bukit Batok", label: "Bukit Batok" },
  //   { value: "Bukit Merah", label: "Bukit Merah" },
  //   { value: "Bukit Panjang", label: "Bukit Panjang" },
  //   { value: "Bukit Timah", label: "Bukit Timah" },
  //   { value: "Central Area", label: "Central Area" },
  //   { value: "Choa Chu Kang", label: "Choa Chu Kang" },
  //   { value: "Clementi", label: "Clementi" },
  //   { value: "Geylang", label: "Geylang" },
  //   { value: "Hougang", label: "Hougang" },
  //   { value: "Jurong East", label: "Jurong East" },
  //   { value: "Jurong West", label: "Jurong West" },
  //   { value: "Kallang/Whampoa", label: "Kallang/Whampoa" },
  //   { value: "Marine Parade", label: "Marine Parade" },
  //   { value: "Pasir Ris", label: "Pasir Ris" },
  //   { value: "Punggol", label: "Punggol" },
  //   { value: "Queenstown", label: "Queenstown" },
  //   { value: "Sembawang", label: "Sembawang" },
  //   { value: "Sengkang", label: "Sengkang" },
  //   { value: "Serangoon", label: "Serangoon" },
  //   { value: "Tampines", label: "Tampines" },
  //   { value: "Toa Payoh", label: "Toa Payoh" },
  //   { value: "Woodlands", label: "Woodlands" },
  //   { value: "Yishun", label: "Yishun" }
  // ]

  return (
    <>
    {predictedPrice && (
      <div className="alert alert-info my-3 align-items-center d-flex" role="alert" style={{height:"100px"}}>
        Price Prediction: ${predictedPrice}
      </div>
    )}
    <div>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
            label="Expect Year of Sale"
            fullWidth
            value={formData.year}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="month"
            label="Expect Month of Sale"
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
    </div>
  </>
  );
};

export default MyForm;
