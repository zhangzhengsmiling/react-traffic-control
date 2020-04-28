import React, { useState, useEffect } from 'react';
import GMap from '../../components/map';
import { Switch, Route } from 'react-router-dom';

import TitleBlock from '../../components/title-block';

import './style.scss';

// class TestComp extends React.Component {

//   canvas:any = null;
//   componentDidMount() {
//     // 
//   }

//   render() {
//     return <div>
//       <img style={{ transform: 'translate(200px, 20px)' }} src="/imgs/light-border.png" alt=""/>
//     </div>
//   }
// }

// const TestComp = () => {
//   const [position, setPosition] = useState({ left: 0, top: 0 });
//   useEffect(() => {
//     const itnervalId = setInterval(() => {
//       setPosition((position) => {
//         console.log(position)
//         return {
//           left: position.left + 5,
//           top: position.top,
//         }
//       })
//     }, 10)
//     return () => {
//       clearInterval(itnervalId);
//     }
//   }, [])
//   return <div style={{ width: '100%', height: '10vh', background: 'red', overflow: 'hidden' }}>
//     <img src="/imgs/light-border.png" style={{
//       transform: `translate(${position.left}px, ${position.top}px)`
//     }} alt=""/>
//   </div>
// }
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
    {/* <div
      style={{ width: '100%', height: '10vh', background: 'rgba(9, 21, 42, 0.8)', lineHeight: '10vh', textAlign: 'center' }}
    >
      <span style={{
        fontSize: '40px',
        color: '#fff',
      }}>交通可视化管控</span>
    </div> */}
    {/* <TestComp></TestComp> */}
    <TitleBlock />
    <div style={{ width: '100%', height: '90vh', background: 'rgba(9, 21, 42, 0.6)', position: 'absolute', display: 'flex', padding: '20px' }}>
      <div className="box" style={{ width: '30%', height: '100%', background: 'rgba(9, 21, 42, 0.8)' }}>
        <div className="content" style={{ width: 'calc(100% - 4px)', height: 'calc(100% - 4px)', background: 'rgba(9, 21, 42, 1)' }}>aaa</div>
      </div>
      <div className="box" style={{ width: '40%', height: '100%', background: 'rgba(9, 21, 42, 0.8)', margin: '0 20px' }}>
        <div className="content" style={{ width: 'calc(100% - 4px)', height: 'calc(100% - 4px)', background: 'rgba(9, 21, 42, 1)' }}></div>
      </div>
      <div className="box" style={{ width: '30%', height: '100%', background: 'rgba(9, 21, 42, 0.8)' }}>
        <div className="content" style={{ width: 'calc(100% - 4px)', height: 'calc(100% - 4px)', background: 'rgba(9, 21, 42, 1)' }}></div>
      </div>
    </div>
  </div>
}

export default Home;
