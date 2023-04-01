import { useEffect, useState, useMemo } from "react";

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

    const [temp, setTemp] = useState(null);

    const points = useMemo(() => ([
        { id: 1, title: "Ang Mo Kio", lat: 1.3691, lng: 103.8454 },
        { id: 2, title: "Bedok", lat: 1.3236, lng: 103.9273 },
        { id: 3, title: "Bishan", lat:  1.3526, lng:  103.8352},
        { id: 4, title: "Bukit Batok", lat:  1.3590, lng:  103.7637},
        { id: 5, title: "Bukit Merah", lat:  1.2819, lng:  103.8239},
        { id: 6, title: "Bukit Panjang", lat:  1.3774, lng:  103.7719},
        { id: 26, title: "Bukit Timah", lat:  1.3340, lng:  103.7760},
        { id: 27, title: "Central Area", lat:  1.3000, lng:  103.8000},
        { id: 7, title: "Choa Chu Kang", lat:  1.3840, lng:  103.7470},
        { id: 8, title: "Clementi", lat:  1.3162, lng:  103.7649},
        { id: 9, title: "Geylang", lat:  1.3201, lng:  103.8918},
        { id: 10, title: "Hougang", lat:  1.3612, lng:  103.8863},
        { id: 11, title: "Jurong East", lat:  1.3329, lng:  103.7436},
        { id: 12, title: "Jurong West", lat:  1.3404, lng:  103.7090},
        { id: 13, title: "Kallang/Whampoa", lat:  1.3100, lng:  103.8651},
        { id: 25, title: "Marine Parade", lat:  1.3029, lng:  103.9074},
        { id: 14, title: "Pasir Ris", lat:  1.3721, lng:  103.9474},
        { id: 15, title: "Punggol", lat:  1.3984, lng:  103.9072},
        { id: 16, title: "Queenstown", lat:  1.2942, lng:  103.7861},
        { id: 17, title: "Sembawang", lat:  1.4491, lng:  103.8185},
        { id: 18, title: "Sengkang", lat:  1.3868, lng:  103.8352},
        { id: 19, title: "Serangoon", lat:  1.3554, lng:  103.8679},
        { id: 20, title: "Tampines", lat:  1.3496, lng:  103.9568},
        // { id: 21, title: "Tenggah", lat:  1.3555, lng:  103.7308},
        { id: 22, title: "Toa Payoh", lat:  1.3343, lng:  103.8563},
        { id: 23, title: "Woodlands", lat:  1.4382, lng:  103.7890},
        { id: 24, title: "Yishun", lat:  1.4304, lng:  103.8354}
    ]), 
    []);

    const load_data = async (e, title) => {
        console.log(title);
        
        if (title.indexOf(" ") !== -1) {
            title = title.replace(" ", "_");

        }
        if (title.indexOf("/") !== -1) {
            title = title.replace("/", "_");
        }
        let address = title.toUpperCase();
        console.log(address);
        
    
        const response = await fetch("http://127.0.0.1:5000/hdb/" + address);
    
        if (response.ok) {
            const temp = await response.json();
            console.log(temp);
            setTemp(temp);
        }
    }

    const center = useMemo(()=>({ lat: 1.3521, lng: 103.8198 }),[]);

    return (
        <div>
            <GoogleMap zoom={12} center={center} >
                <div style={{ height: '80vh', width: '100%' }}>
                    {points.map(({id, lat, lng, title}) => {
                        return (
                            <MarkerF key={id} position = {{ lat: lat, lng: lng }} label={id} onClick={e => load_data(e, title)}/>
                        );
                    })
                    }
                </div>
                {/* <MarkerF visible={true} position={{ lat: 1.3521, lng: 103.8198 }}/> */}
            </GoogleMap>
            <div>This are the details of the location when you click on the markers</div><br></br>
            {temp && (
                <div className='container' style={{padding: "0px"}}>
                    <div className='row'>
                        <h4>Area Name: {temp.town}</h4>

                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p>Max Address: {temp.max_address}</p>
                            <p>Most Expensive Flat Model: {temp.max_flat_model}</p>
                            <p>Most Expensive Flat Type: {temp.max_flat_type}</p>
                            <p>Most Expensive Flat Size: {temp.max_floor_area_sqm} sqm</p>
                            <p>Price: ${temp.maximum_price}</p>
                            <p>Date of Sale: ${temp.max_month}</p>
                        </div>
                        <div className='col'>
                            <p>Max Address: {temp.min_address}</p>
                            <p>Most Expensive Flat Model: {temp.min_flat_model}</p>
                            <p>Most Expensive Flat Type: {temp.min_flat_type}</p>
                            <p>Most Expensive Flat Size: {temp.min_floor_area_sqm}sqm</p>
                            <p>Price: ${temp.minimum_price}</p>
                            <p>Date of Sale: ${temp.min_month}</p>
                        </div>

                    </div>
                </div>
                
            )} 
        </div>
    );
}

