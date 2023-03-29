import React from "react";
import GoogleMapReact from 'google-map-react';
import "./geostyle.css"
import MyMarker from "./MyMarker";

import {List} from 'immutable';

const points = [
	{ id: 1, title: "Ang Mo Kio", lat: 1.3710, lng: 103.8459 },
	// { id: 2, title: "The Long Water", lat: 1.3010, lng: 100.175 },
	// { id: 3, title: "The Serpentine", lat: 1.4210, lng: 101.164 }
  ];

export default function SimpleMap(){
  	const defaultProps = {
    	center: {
			lat:1.3521, 
			lng:103.8198},
    	zoom: 11,
	};

  	return (
    // Important! Always set the container height explicitly
		<div style={{ height: '80vh', width: '100%' }}>
			;
			<GoogleMapReact
				bootstrapURLKeys={{ key: "" }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				{points.map(({ lat, lng, id, title }) => {
				return (
					<MyMarker key={id} lat={lat} lng={lng} text={id} tooltip={title} />
				);
				})}
			</GoogleMapReact>
		</div>
	);
	
}