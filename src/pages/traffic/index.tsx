import React, { useState, useEffect } from 'react';
// import { renderToString } from 'react-dom/server';
// import { Dropdown, Button, Menu, Pagination, Divider, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Iconfont from '../../components/iconfont';

import TitleBlock from '../../components/title-block';
import Alert from './alert';
import Jam from './jam';
import Parking from './parking';
import Nav from '../../components/nav';
import './style.scss';

// declare const AMap;
// declare const Loca;
// const CENTER_WESTLAKE: [number, number] = [120.04819, 30.243851];
// const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];


interface IPropsTraffic {

}

let _map = null;

// const computeOffset = (r, angel) => {
//   const theta = angel / 180 * Math.PI;
//   const x = r * (1 - Math.cos(theta));
//   const y = r * Math.sin(theta);
//   // alert(Math.sin(theta));
//   return {
//     x,
//     y,
//   }
// }

const parseKeyFromPath = (path:string) => {
  const target = path.split('/');
  return target[target.length - 1];
}


const Traffic = (props: any) => {
  const [navKey, setNavKey] = useState(parseKeyFromPath(props.location.pathname));
  useEffect(() => {
    setNavKey(parseKeyFromPath(props.location.pathname));
  }, [props.location.pathname])
  const navs = [
    { key: 'alert', title: '告警管理', icon: <Iconfont type="icongaojingguanli" />, path: '/traffic/alert' },
    { key: 'jam', title: '交通拥堵', icon: <Iconfont type="iconyongdudu" />, path: '/traffic/jam' },
    { key: 'parking', title: '停车位', icon: <Iconfont type="icontingchewei" />, path: '/traffic/parking' },
  ];
  return <div className="traffic">
    <TitleBlock />
    <div style={{ width: '100%', height: '100%'}}>
      <Route path="/traffic/alert" component={() => <Alert alertList={[]} />} />
      <Route path="/traffic/jam" component={() => <Jam />} />
      <Route path="/traffic/parking" component={Parking} />
      {/* <Route path="/traffic/" exact component={Parking}></Route> */}
      {/* <IndexRoute ></IndexRoute> */}
      {/* <Redirect from="/traffic" to="/traffic/alert" /> */}
    </div>
    {/* <div
      style={{
        width: '460px',
        height: '230px',
        position: 'absolute',
        background: 'red',
        bottom: 0,
        left: '50%',
        transformOrigin: '50% calc(100% - 30px)',
        transform: 'translateX(-50%)',
      }}
    >
    </div> */}
    <Nav
      onNavChange={(item) => {
        // console.log(item)
        setNavKey(item.key);
      }}
      navs={navs}
      navKey={navKey}
    />
  </div>
}

export default Traffic;
