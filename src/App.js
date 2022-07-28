import React from 'react'
import { GoogleMap, useJsApiLoader,Marker,InfoWindow } from '@react-google-maps/api';
import data from './network_data';
import { useState } from 'react';
import './App.css';
import mapStyles from './mapStyles';
const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat:28.644800,
  lng:77.216721
};


function MyComponent() {


  const [city,setselectedcity]=useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap 
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ styles: mapStyles.maptheme }}
      >
        
        
         {data.map(network=>(<Marker
          key={network.id}
          position={{lat:network.coordinates[0],lng:network.coordinates[1]
          
          }}
          onClick={()=>{
          setselectedcity(network);
        }}
        
         />))}
         
       {city&&(<InfoWindow  position={{lat:city.coordinates[0],lng:city.coordinates[1]}} onCloseClick={()=>{setselectedcity(null);}}>
       
       <div className='info-box'>
       <h2 className='infoboxheader'>Data Consuption</h2>
       <h3>City: {city.region}</h3>
       <h3>Average Consuption: {city.data}</h3>
       <h3>Country Domain {city.domain}</h3>
       </div></InfoWindow>)}
        
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)