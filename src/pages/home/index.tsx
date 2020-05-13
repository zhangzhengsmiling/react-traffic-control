import React, { useState, useEffect } from 'react';
import GMap from '../../components/map';
import { Switch, Route } from 'react-router-dom';

import TitleBlock from '../../components/title-block';
import ContainerAnt from '../../components/container-ant';
import ContainerBox from '../../components/container-box';

import './style.scss';

const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];

const Home = (props:any) => {
  const center: [number, number] = CENTER_XIXISHIDI ;
  const match = props.match;
  return <div style={{ width: '100vw', height: '100vh', background: 'rgb(0, 0, 1)' }}>
    <GMap
      appKey="264957655c49306d2b11298a1f30cabf"
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
      viewMode="3D"
      pitch={50}
      center={center}
      zoom={14}
      layers={[]}
    >
      
    </GMap>
    <TitleBlock />
    <div style={{ width: '100%', height: '90vh', background: 'rgba(9, 21, 42, 0.6)', position: 'absolute', display: 'flex', padding: '20px' }}>
      <ContainerAnt style={{ width: '30%' }}>
        <div style={{ width: '100%', height: '40px', textAlign: 'center' }}>
          <span className="font-block" style={{ fontSize: '22px', fontWeight: 500 }} onClick={() => {
            props.history.push('/traffic/alert');
          }}>数据告警</span>
        </div>
        <div style={{ width: '40%', height: '4px', background: 'greenyellow', marginLeft: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to right, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to left, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
        </div>
        <ContainerBox title="标题" content={'aaaa'} />
      </ContainerAnt>
      <ContainerAnt style={{ width: '40%' }}>
        
      </ContainerAnt>
      <ContainerAnt style={{ width: '30%' }}>
        <div style={{ width: '100%', height: '40px', background: 'red' }}></div>
      </ContainerAnt>
    </div>
  </div>
}

export default Home;
