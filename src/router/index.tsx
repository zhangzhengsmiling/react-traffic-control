import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch , Redirect} from 'react-router-dom';
import asyncImport from '../utils/asyncImport';
import path from 'path';

import Home from '../pages/home';
import About from '../pages/about';
import Map from '../components/map';
import Marker from '../components/map/marker';


export default () => {
  return <Router>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/map" component={() => {
        const [center, setCenter] = useState([120.0023, 30.005]);
        useEffect(() => {
          setTimeout(() => {
            setCenter([120, 30]);
          }, 3000)
        }, [])
        return <Map
          appKey="264957655c49306d2b11298a1f30cabf"
          center={center as [number, number]}
          onZoomStart={(status) => {console.log(status)}}
          zoom={10}
        >
          <Marker
            position={[120, 30]}
            content={<div style={{ width:'40px', height: '40px', background: 'orange' }} onClick={() =>{
              alert('clicked...')
            }}></div>}
          ></Marker>
          {/* <Marker></Marker> */}
        </Map>;
      }}></Route>
      <Redirect from="/" to="/home"></Redirect>
    </Switch>
  </Router>
}
