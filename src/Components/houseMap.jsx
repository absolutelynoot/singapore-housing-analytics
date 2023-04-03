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
    const [hdb, setHDB] = useState([]);
    const [hdbAddress, setHdbAddress] = useState('');
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

        const response2 = await fetch(`http://127.0.0.1:5000/hdb/street/${value}`);
        const data2 = await response2.json();
        console.log(data2['Result']);

        if (data2['Result'].length > 0) {
            setHDB(data2['Result']);
            setHdbAddress(value);
        } 

        setValue('');
      };
    
      const handleInputChange = (event) => {
        setValue(event.target.value.toUpperCase());
    };

    return (
            <>
                <div>
                    <br></br>
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
                <br></br>
                <GoogleMap zoom={zoom} center={center}>
                    <div style={{ height: '80vh', width: '100%' }}>
                        {points.map(({id, lat, lng, title}) => {
                            return (
                                <MarkerF key={id} position = {{ lat: lat, lng: lng }} label={id} onClick={e => load_data(e, title)}/>
                            );
                        })}
                    </div>
                </GoogleMap>
                <br></br>
                {hdb.length > 0 && (
                    <div className="container" style={{ padding: "0px" }}>
                        <div className="card shadow-sm">
                            <div className="card-header">Recent Transactions</div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Street Name: {hdbAddress} </h5>
                                <p className="card-text">
                                    Listed below are the recent transactions
                                    2017 onwards.
                                </p>
                                {hdb.map((item) => (
                                    <div className="row" style={{paddingBottom: "10px"}}>
                                        <div className="col">
                                            <div className="card">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        Flat Model: {item.flat_model}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Flat Type: {item.flat_type}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Floor Area Sqm: {item.floor_area_sqm}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Remaining Lease: {item.remaining_lease}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Storey Range: {item.storey_range}
                                                    </li>                                              
                                                    <li className="list-group-item">
                                                        Transaction Date: {item.month}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Resale Price: ${item.resale_price}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>     
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
