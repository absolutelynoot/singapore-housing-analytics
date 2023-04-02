import { useEffect, useState, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./geoStyle.css"

export default function SimpleMap() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "",
    });
  
    if (!isLoaded) return <div>Loading...</div>;
    return <Map/>
    ;
}

function Map() {
    const [value, setValue] = useState('');
   
    const [points, setPoints] = useState([
        {},
    ]);

    const [center, setCenter] = useState(
        { lat: 1.3521, lng: 103.8198 }
    )

    const [zoom, setZoom] = useState(12);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(value);

        const response = await fetch(`https://developers.onemap.sg/commonapi/search?searchVal=${value}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
        const data = await response.json();
        
        const lat = parseFloat(data.results[0]["LATITUDE"]);
        const lng = parseFloat(data.results[0]["LONGITUDE"]);

        setPoints(points => [...points, { id: points.length + 1, title: value, lat: lat, lng: lng }]);
        setCenter({ lat: lat, lng: lng });
        setZoom(15);

        // setValue('');
      };
    
      const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
        
            <div>
            {/* <form onSubmit={handleSubmit}>
                <TextField
                    id="input-field"
                    label="Input field"
                    variant="outlined"
                    value={value}
                    onChange={handleInputChange}
                />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form> */}
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                    <TextField
                    id="input-field"
                    label="Input Address"
                    variant="outlined"
                    value={value}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    >
                    Find your house
                    </Button>
                </Grid>
            </Grid>
            </form>
            </div>
            <GoogleMap zoom={zoom} center={center}>
                <div style={{ height: '80vh', width: '100%' }}>
                    {points.map(({id, lat, lng, title}) => {
                        return (
                            <MarkerF key={id} position = {{ lat: lat, lng: lng }} label={id} onClick={e => load_data(e, title)}/>
                        );
                    })
                    }
                </div>
            </GoogleMap>
    
        </>
    );
}

