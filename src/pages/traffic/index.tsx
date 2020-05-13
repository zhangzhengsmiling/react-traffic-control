import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { Dropdown, Button, Menu, Pagination, Divider, Row, Col } from 'antd';
import { Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';

import GMap from '../../components/map';
import Marker from '../../components/map/marker';
// import GlowingText from '../../components/glowing-text';
import TitleBlock from '../../components/title-block';
import Drawer from '../../components/drawer';
import Alert from './alert';
import Jam from './jam';
import Parking from './parking';
// import withRadial from '../../hocs/withRadial';
import './style.scss';

// declare const AMap;
// declare const Loca;
// const CENTER_WESTLAKE: [number, number] = [120.04819, 30.243851];
// const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];


interface IPropsTraffic {

}

let _map = null;

const computeOffset = (r, angel) => {
  const theta = angel / 180 * Math.PI;
  const x = r * (1 - Math.cos(theta));
  const y = r * Math.sin(theta);
  // alert(Math.sin(theta));
  return {
    x,
    y,
  }
}


const Traffic = (props: any) => {
  return <div className="traffic">
    
    <TitleBlock />
    {/* <Drawer
      show={true}
      style={{ width: '400px', height: '800px', background: 'rgba(9, 21, 42, 0.8)', top: '10vh' }}
      direction="left"
    > */}
    <div style={{ width: '100%', height: '100%'}}>
      <Route path="/traffic/alert" component={() => <Alert alertList={[]} />} />
      <Route path="/traffic/jam" component={() => <Jam />} />
      <Route path="/traffic/parking" component={Parking} />
      {/* <IndexRoute ></IndexRoute> */}
      {/* <Redirect from="/traffic" to="/traffic/alert" /> */}
      
    </div>
    {/* </Drawer> */}
    <div style={{
      width: '460px', height: '230px',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transformOrigin: '50% calc(100% - 30px)',
      transform: 'translateX(-50%)',
    }}>
    </div>
  </div>
}

export default Traffic;
