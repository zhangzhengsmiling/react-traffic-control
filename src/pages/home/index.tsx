import React from 'react';
import GMap from '../../components/map';

import TitleBlock from '../../components/title-block';
import ContainerAnt from '../../components/container-ant';
import WaveChart from '../../components/wave-chart-v2';
import RotatePie from '../../components/rotate-pie';
import DataOverview from '../../components/data-overview';
import LineChart from '../../components/line-chart';
import RatioBar from '../../components/ratio-bar';
// import ContainerBox from '../../components/container-box';

import './style.scss';

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


const label = (l: string) => <div style={{ fontSize: '20px', color: 'rgb(132, 193, 255)', verticalAlign: 'middle' }}>
  <div style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: colorMap.get(l), margin: '0 8px' }} />
  {l}
  </div>;
const value = (v: number) => <div style={{ fontSize: '24px', color: '#fff', textShadow: '1px 1px 10px rgb(132, 193, 255)' }}> {Math.round(v * 100)}% </div>;

const parkingLabel = (l: string | number) => <div style={{ fontSize: '20px', color: 'rgb(130, 189, 251)' }}> {l} </div>
const parkingValue = (v: string | number) => <div style={{ fontSize: '24px', color: '#fff', textShadow: '1px 1px 10px rgb(130, 189, 251)' }}> {v} </div>

const Home = (props:any) => {
  const center: [number, number] = CENTER_XIXISHIDI ;
  const alertOverview = [
    { label: '紧急', value: 0.25 },
    { label: '严重', value: 0.25 },
    { label: '一般', value: 0.25 },
    { label: '轻微', value: 0.25 },
  ]
  // const match = props.match;
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
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to right, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to left, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
        </div>
        <div style={{ width: '100%', height: 'auto', background: 'rgba(25, 48, 92, 0.5)', padding: '10px 0', marginTop: '20px', borderRadius: '5px' }}>
          <RotatePie data={alertOverview} colors={colors} />
          <DataOverview style={{ marginTop: '10px' }} overview={alertOverview.map(item => ({ 
              label: label(item.label),
              value: value(item.value),
            }))
          } />
        </div>
        <div style={{ width: '100%', height: '400px', background: 'rgba(25, 48, 92, 0.5)', padding: '10px 0', marginTop: '20px', borderRadius: '5px' }}>
          <WaveChart />
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
          <div style={{ width: '100%', height: '266px', background: 'rgb(17, 34, 67)', padding: '13px' }}>
            <div style={{ width: '100%', height: '40px', color: '#fff', lineHeight: '40px', fontSize: '20px' }}>路口名称</div>
            <div style={{ width: '100%', height: '200px' }}>
              <div style={{width: '30%', height: '100%', float: 'left', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '20px', fontWeight: 600, textAlign: 'center' }}>路口流量</div>
                  <div style={{ color: '#fff', fontSize: '28px', fontWeight: 600, textAlign: 'center' }}>300</div>
                </div>
              </div>
              <div style={{ width: '70%', height: '100%', float: 'left', borderLeft: '1px solid green' }}>
                <div style={{ width: '100%', height: '20px', fontSize: '14px', lineHeight: '20px', color: '#fff', paddingLeft: '15px' }}>路口流量变化趋势</div>
                <div style={{ width: '100%', height: '180px' }}>
                  <LineChart style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '266px', background: 'rgb(17, 34, 67)', padding: '13px', marginTop: '20px' }}>
            <div style={{ width: '100%', height: '40px', color: '#fff', lineHeight: '40px', fontSize: '20px' }}>路口名称</div>
            <div style={{ width: '100%', height: '200px' }}>
              <div style={{width: '30%', height: '100%', float: 'left', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '20px', fontWeight: 600, textAlign: 'center' }}>路口流量</div>
                  <div style={{ color: '#fff', fontSize: '28px', fontWeight: 600, textAlign: 'center' }}>300</div>
                </div>
              </div>
              <div style={{ width: '70%', height: '100%', float: 'left', borderLeft: '1px solid green' }}>
                <div style={{ width: '100%', height: '20px', fontSize: '14px', lineHeight: '20px', color: '#fff', paddingLeft: '15px' }}>路口流量变化趋势</div>
                <div style={{ width: '100%', height: '180px' }}>
                  <LineChart style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '266px', background: 'rgb(17, 34, 67)', padding: '13px', marginTop: '20px' }}>
            <div style={{ width: '100%', height: '40px', color: '#fff', lineHeight: '40px', fontSize: '20px' }}>路口名称</div>
            <div style={{ width: '100%', height: '200px' }}>
              <div style={{width: '30%', height: '100%', float: 'left', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '20px', fontWeight: 600, textAlign: 'center' }}>路口流量</div>
                  <div style={{ color: '#fff', fontSize: '28px', fontWeight: 600, textAlign: 'center' }}>300</div>
                </div>
              </div>
              <div style={{ width: '70%', height: '100%', float: 'left', borderLeft: '1px solid green' }}>
                <div style={{ width: '100%', height: '20px', fontSize: '14px', lineHeight: '20px', color: '#fff', paddingLeft: '15px' }}>路口流量变化趋势</div>
                <div style={{ width: '100%', height: '180px' }}>
                  <LineChart style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </ContainerAnt>
      <ContainerAnt style={{ width: '30%' }}>
        {/* <div style={{ width: '100%', height: '40px', background: 'red' }}></div> */}
        <div style={{ width: '100%', height: '40px', textAlign: 'center' }}>
          <span className="font-block" style={{ fontSize: '22px', fontWeight: 500 }} onClick={() => {
            props.history.push('/traffic/parking');
          }}>停车场管理</span>
        </div>
        <div style={{ width: '40%', height: '4px', background: 'greenyellow', marginLeft: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to right, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
          <div style={{ float: 'left', width: '50%', height: '4px', background: 'linear-gradient(to left, rgb(9, 21, 42), rgb(82, 140, 157))' }}></div>
        </div>

        {
          new Array(4).fill('').map(() => {
            return <div style={{ width: '100%', height: '195px', background: 'rgb(17, 34, 67)', marginTop: '20px', position: 'relative' }}>
              <div style={{ width: '100%', height: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
                <div style={{ width: '100%', height: '40px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '28px', marginLeft: '10px', marginBottom: '10px' }}>title</div>
                <DataOverview overview={[
                  { label: '总车位数', value: 125 },
                  { label: '剩余车位数', value: 44 },
                  { label: '当日入闸数', value: 226 },
                  { label: '当日出闸数', value: 126 },
                ].map(item => ({
                  label: parkingLabel(item.label),
                  value: parkingValue(item.value),
                }))} />
                <RatioBar />
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
