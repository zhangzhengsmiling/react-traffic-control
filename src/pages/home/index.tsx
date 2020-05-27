import React, { useEffect, useState } from 'react';
import GMap from '../../components/map';

import TitleBlock from '../../components/title-block';
import ContainerAnt from '../../components/container-ant';
import WaveChart from '../../components/wave-chart-v2';
import RotatePie from '../../components/rotate-pie';
import DataOverview from '../../components/data-overview';
import LineChart from '../../components/line-chart';
import RatioBar from '../../components/ratio-bar';
import IntersectionItem from './intersection-item';
// import ContainerBox from '../../components/container-box';

import './style.scss';
import { message } from 'antd';

const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];
const colorMap = new Map([
  ['紧急', 'rgb(106, 106, 255)'],
  ['严重', 'rgb(147, 147, 255)'],
  ['一般', 'rgb(185, 185, 255)'],
  ['轻微', 'rgb(236, 236, 255)'],
])
const colors = [
  'rgb(106, 106, 255)',
  'rgb(147, 147, 255)',
  'rgb(185, 185, 255)',
  'rgb(236, 236, 255)',
]

const levelMap = new Map([
  ['1', '紧急'],
  ['2', '严重'],
  ['3', '一般'],
  ["4", '轻微'],
]);

const typeMap = new Map([
  ['1', '交通事故'],
  ['2', '交通拥堵'],
  ['3', '设备故障'],
  ['4', '天气异常'],
]);

const label = (l: string) => <div style={{ fontSize: '20px', color: 'rgb(132, 193, 255)', verticalAlign: 'middle' }}>
  <div style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: colorMap.get(l), margin: '0 8px' }} />
  {l}
  </div>;
const value = (v: number) => <div style={{ fontSize: '24px', color: '#fff', textShadow: '1px 1px 10px rgb(132, 193, 255)' }}> {Math.round(v * 100)}% </div>;

const parkingLabel = (l: string | number) => <div style={{ fontSize: '20px', color: 'rgb(130, 189, 251)' }}> {l} </div>
const parkingValue = (v: string | number) => <div style={{ fontSize: '24px', color: '#fff', textShadow: '1px 1px 10px rgb(130, 189, 251)' }}> {v} </div>

const Home = (props:any) => {
  const center: [number, number] = CENTER_XIXISHIDI ;
  const [levelOverview, setLevelOverview] = useState([]);
  const [typeOverview, setTypeOverview] = useState(new Array(4).fill({ label: '--', value: 0 }));
  const [intersections, setIntersections] = useState([]);
  useEffect(() => {
    fetch('/alert/level_overview').then(res => res.json())
      .then(res => {
        console.log(res);
        const { result, data, messagee } = res;
        if(result) {
          const total = Object.keys(data).reduce((temp, cur) => {
            return temp + data[cur];
          }, 0);
          const levelOverview = Object.keys(data).map(key => ({
            label: levelMap.get(key),
            value: Math.round(data[key] / total * 100) / 100,
          }))
          setLevelOverview(levelOverview);
        } else {
          message.error(message);
        }
      })
      .catch(err => message.error(err.message));

    fetch('/alert/type_overview').then(res => res.json())
      .then(res => {
        const { result, data, message } = res;
        if(result) {
          // setTypeOverview()
          const total = Object.keys(data).reduce((temp, cur) => {
            return temp + data[cur];
          }, 0);
          const typeOverview = Object.keys(data).map(key => ({
            label: typeMap.get(key),
            value: Math.round(data[key] / total * 100) / 100,
          }))
          setTypeOverview(typeOverview);
        } else {
          message.error(message);
        }
      })
      .catch(err => message.error(err.message))

    fetch('/jam/intersection').then(res => res.json())
      .then(res => {
        console.log(res);
        // if()
        const { result, data, message } = res;
        if(result) {
          const intersections = data.sort((a, b) => b.flow_count - a.flow_count).slice(0, 3);
          setIntersections(intersections);
        } else {
          message.error(message);
        }
      })
      .catch(err => message.error(message));

  }, [])

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
          }}>告警管理</span>
        </div>
        <div style={{ width: '40%', height: '4px', background: 'greenyellow', marginLeft: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to right, rgb(9, 21, 42), rgb(82, 140, 157))' }} />
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to left, rgb(9, 21, 42), rgb(82, 140, 157))' }} />
        </div>
        <div style={{ width: '100%', height: 'auto', background: 'rgba(25, 48, 92, 0.5)', padding: '10px 0', marginTop: '20px', borderRadius: '5px' }}>
          <RotatePie data={levelOverview} colors={colors} />
          <DataOverview
            style={{ marginTop: '10px' }}
            overview={levelOverview.map(item => ({ 
                label: label(item.label),
                value: value(item.value),
              }))
            }
          />
        </div>
        <div style={{ width: '100%', height: '400px', background: 'rgba(25, 48, 92, 0.5)', padding: '10px 0', marginTop: '20px', borderRadius: '5px' }}>
          <WaveChart    
            data = {typeOverview}/>
        </div>
      </ContainerAnt>
      <ContainerAnt style={{ width: '40%' }}>
        <div style={{ width: '100%', height: '40px', textAlign: 'center' }}>
          <span className="font-block" style={{ fontSize: '22px', fontWeight: 500 }} onClick={() => {
            props.history.push('/traffic/jam');
          }}>交通拥堵</span>
        </div>
        <div style={{ width: '40%', height: '4px', background: 'greenyellow', marginLeft: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to right, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to left, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
        </div>
        <div style={{ width: '100%', height: '100%', marginTop: '20px' }}>
          {
            intersections.map((item, index) => <IntersectionItem
              target={item}
              key={`intersection-${index}`}
              title={item.name} intersectionFlow={item.flow_count}
            />)
          }
        </div>
        
      </ContainerAnt>
      <ContainerAnt style={{ width: '30%' }}>
        {/* <div style={{ width: '100%', height: '40px', background: 'red' }}></div> */}
        <div style={{ width: '100%', height: '40px', textAlign: 'center' }}>
          <span 
            className="font-block"
            style={{ fontSize: '22px', fontWeight: 500 }}
            onClick={() => props.history.push('/traffic/parking')}
          >停车场管理</span>
        </div>
        <div style={{ width: '40%', height: '4px', background: 'greenyellow', marginLeft: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to right, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to left, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
        </div>

        {
          new Array(4).fill('').map(() => [
            { label: '总车位数', value: 125 + Math.floor(Math.random() * 20)},
            { label: '剩余车位数', value: 44 + Math.floor(Math.random() * 30) },
            { label: '当日入闸数', value: 226 + Math.floor(Math.random() * 30) },
            { label: '当日出闸数', value: 126  + Math.floor(Math.random() * 30) },
          ]).sort((a, b) => (b[0].value - b[1].value) / b[0].value - (a[0].value - a[1].value) / a[0].value).map((item, index) => {
            // const overviewData = 
            return <div key={index} style={{ width: '100%', height: '195px', background: 'rgb(17, 34, 67)', marginTop: '20px', position: 'relative' }}>
              <div style={{ width: '100%', height: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
                <div style={{ width: '100%', height: '40px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '28px', marginLeft: '10px', marginBottom: '10px' }}> {`停车场${index + 1}`} </div>
                <DataOverview overview={item.map(item => ({
                  label: parkingLabel(item.label),
                  value: parkingValue(item.value),
                }))} />
                <RatioBar ratio={Math.round((item[0].value - item[1].value) / item[0].value  * 100) / 100} />
              </div>
            </div>
          })
        }
        {/* <div style={{ width: '100%', height: '195px', background: 'rgb(17, 34, 67)', marginTop: '20px' }}></div>
        <div style={{ width: '100%', height: '195px', background: 'rgb(17, 34, 67)', marginTop: '20px' }}></div>
        <div style={{ width: '100%', height: '195px', background: 'rgb(17, 34, 67)', marginTop: '20px' }}></div> */}
      </ContainerAnt>
    </div>
  </div>
}

export default Home;
