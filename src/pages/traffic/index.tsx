  import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { Dropdown, Button, Menu, Pagination, Divider, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import GMap from '../../components/map';
import Marker from '../../components/map/marker';
// import GlowingText from '../../components/glowing-text';
import TitleBlock from '../../components/title-block';
import Drawer from '../../components/drawer';
import Alert from './alert';
import BarChart from '../../components/bar-chart';
import CountDown from '../../components/count-down';
// import withRadial from '../../hocs/withRadial';
import './style.scss';

declare const AMap;
declare const Loca;
const CENTER_WESTLAKE: [number, number] = [120.04819, 30.243851];
const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];

const random = (index) => ({
  'queue_len': (Math.random() * 200).toFixed(0),
  'inter_name': `name-${index}`,
  'lng': (120.056033 + Math.random() * 0.05 - 0.025).toFixed(4),
  'lat': (30.270448 + Math.random() * 0.05 - 0.025).toFixed(4),
})

const Flow = (props) => {
  const heatMapData = props.heatMapData;
  return <div style={{ width: '100%', height: '100%', background: 'rgb(9, 21, 42)' }}>
  <div style={{ color: '#fff', fontSize: '18px' }}>实时车流Top10</div>
  <div style={{ marginTop: '16px' }}>
    <div style={{ color: 'rgb(136, 180, 219)', background: 'rgba(25, 48, 92, 0.4)', padding: '5px 10px' }}>
      <Row>
        <Col span={18}>路口名称</Col>
        <Col style={{ textAlign: 'right' }} span={6}>车流量</Col>
      </Row>
    </div>
    <div style={{ height: '160px', overflowY: 'scroll' }}>
      {
        heatMapData
          .filter(item => item.queue_len > 180)
          .sort((a, b) => b.queue_len - a.queue_len)
          .slice(0, 10)
          .map((item, index) => {
          return <div key={`heat-item-${index}`} style={{ color: '#fff', background: 'rgb(25, 48, 92)', margin: '5px 0', padding: '5px 10px' }}>
            <Row>
              <Col span="18"> {item.inter_name} </Col>
              <Col span="6" style={{ textAlign: 'right' }}> {item.queue_len} </Col>
            </Row>
          </div>
        })
      }
    </div>
  </div>
  <div style={{ width: '100%', height: '2px', background: 'rgba(114, 130, 213, 0.4)', margin: '16px 0' }}></div>
  <div style={{ color: '#fff', fontSize: '18px' }}>当日车流</div>
  {/* <div></div> */}
  <div>
  <BarChart
      style={{ width: '360px', height: '200px', background: 'rgb(25, 48, 92)' }}
      data={deviceOverview}
      color={[
        [ { offset: 0, color: 'rgb(238, 89, 72)' }, { offset: 1, color: 'rgba(238, 89, 72, 0)'} ],
        [ { offset: 0, color: 'rgb(230, 174, 62)' }, { offset: 1, color: 'rgba(230, 174, 62, 0)' } ] ,
        [ { offset: 0, color: 'rgb(28, 195, 179)' }, { offset: 1, color: 'rgba(28, 195, 179, 0)' } ]
      ]}
    />
    <div style={{ width: '100%', height: '260px' }}>
      <div style={{ color: '#fff', fontSize: '16px', marginTop: '12px' }}>路口1</div>
      <Row gutter={20}>
        <Col span={10} style={{ color: '#fff' }}>
          <div style={{ width: 'auto', height: '100%', background: 'rgb(25, 48, 92)', paddingTop: '40px' }}>
            <div style={{ fontSize: '12px', textAlign: 'center' }}>当日车流峰值(每小时)</div>
            <div style={{ textAlign: 'center', margin: '16px 0' }}>
              <CountDown
                style={{ textAlign: 'center', fontSize: '22px' }}
                start={0}
                value={200}
                mapFn={parseInt}
              />
            </div>
            <div style={{ fontSize: '12px', textAlign: 'center' }}>峰值时间段</div>
            <div style={{ textAlign: 'center', fontSize: '20px', margin: '16px 0' }}>8:00 - 9:00</div>
          </div>
        </Col>
        <Col span={14}>
          <div style={{ color: 'rgb(136, 180, 219)', background: 'rgba(25, 48, 92, 0.4)', padding: '5px 10px' }}>
            <Row>
              <Col span={18}>时间段</Col>
              <Col style={{ textAlign: 'right' }} span={6}>车流量</Col>
            </Row>
          </div>
          <div style={{ height: '180px', overflowY: 'hidden' }}>
            {
              [{time: '6: 00 - 9:00', count: '400'}, { time: '9:00 - 17:00', count: '264' }, { time: '17:00 - 20:00', count: '654' }, { time: '20:00 - 22:00', count: '129' }, { time: '22:00 - 6:00', count: '32' }]
                .map((item, index) => {
                return <div key={`heat-item-${index}`} style={{ color: '#fff', background: 'rgb(25, 48, 92)', margin: '5px 0', padding: '5px 10px' }}>
                  <Row>
                    <Col span="18"> {item.time} </Col>
                    <Col span="6" style={{ textAlign: 'right' }}> {item.count} </Col>
                  </Row>
                </div>
              })
            }
          </div>
        </Col>
      </Row>
    </div>
  </div>
</div>
}

const genRandomHotMap = (amount) => {
  return new Array(amount).fill('').map((item, index) => {
    return random(index);
  })
}

const renderHeatMap = (map, heatMapData) => {
  const layer = new Loca.HeatmapLayer({
    map,
  })
  layer.setData(heatMapData, {
      lnglat: function(data){
          return [data.value.lng, data.value.lat]
      },
      value: 'queue_len'
  });

  layer.setOptions({
      style: {
          radius: 18,
          color: {
              0.5: '#2c7bb6',
              0.65: '#abd9e9',
              0.7: '#ffffbf',
              0.9: '#fde468',
              1.0: '#d7191c'
          }
      }
  }).render();
}

const testAlertList = [
  { title: '测试告警', time: '2020-04-18', type: '交通拥堵', level: '严重', status: '', position: [120.057746,30.302383] },
  { title: '测试告警', time: '2020-04-18', type: '交通事故', level: '紧急', status: '',  position: [120.069483, 30.286755]},
  { title: '测试告警', time: '2020-04-18', type: '设备故障', level: '一般', status: '', position: [120.045301, 30.241719] },
  { title: '测试告警', time: '2020-04-18', type: '天气异常', level: '轻微', status: '' },
];

const deviceOverview =  {
  legend: ['车流量'],
  xAxis: ['路口1', '路口2', '路口3', '路口4'],
  yAxis: [
    'count'
  ],
  data: [
    [400, 482, 634, 588],
    // [483, 2, 3, 4],
    // [622, 6, 7, 8],
  ]
}

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
  console.log(props)
  // const center = CENTER_WESTLAKE;
  const [gMapOption, setGMapOption] = useState({ center: CENTER_XIXISHIDI, zoom: 14 });
  const [layers, setLayers] = useState([]);
  const [heatMapData, setHeatMapData] = useState([]);
  const [alertList, setAlertList] = useState(testAlertList);
  useEffect(() => {
    const heatMapData = genRandomHotMap(200);
    fetch('/mock/heatmap.json')
      .then(res => res.json())
      .then(res => {
        setHeatMapData(heatMapData);
      })
  }, [])

  useEffect(() => {
    let layers = [];
    if(/alert/.test(props.location.pathname)) {
      setAlertList(testAlertList);
      if(typeof AMap === 'undefined') return;
      layers = [
        new AMap.TileLayer(),
        // new AMap.TileLayer.RoadNet(),
        new AMap.TileLayer.Traffic(),
        // ...this.props.layers,
      ];
    }
    if(/jam/.test(props.location.pathname)) {
      setAlertList(() => []);
      if(typeof AMap === 'undefined') return;
      renderHeatMap(_map, heatMapData);
    }
    setLayers(layers)
  }, [props.location])
  console.log(alertList)

  return <div style={{ position: 'absolute', zIndex: 10, width: '100vw', height: '100vh' }}>
    <GMap
      appKey="264957655c49306d2b11298a1f30cabf"
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
      onCompleted={(map) => {
        let layers = [];
        _map = map;
        if(/alert/.test(props.location.pathname)) {
          layers = [
            new AMap.TileLayer(),
            // new AMap.TileLayer.RoadNet(),
            new AMap.TileLayer.Traffic(),
            // ...this.props.layers,
          ];
          setAlertList(testAlertList)
        }
        if(/jam/.test(props.location.pathname)) {
          renderHeatMap(map, heatMapData);
          setAlertList(() => [])
        }
        setLayers(layers)
      }}
      viewMode="3D"
      pitch={50}
      center={gMapOption.center}
      zoom={gMapOption.zoom}
      layers={layers}
    >
      {
        alertList
          .map(item => {
            console.log(item, '----------------------')
            return item;
          })
          .filter(item => item.position)
          .map((item, index) => 
            <Marker key={`marker-${index}`} position={item.position as [number, number]}
              content={
                <div className="radial" style={{ transform: 'translate(-50%, -50%)' }}></div>
              }
              onClick={(e, map) => {
                setGMapOption(prevOption => ({
                  ...prevOption,
                  zoom: 18,
                  center: item.position as [number, number],
                }))
                var infoWindow = new AMap.InfoWindow({
                  anchor: 'middle-left',
                  content: renderToString(<div style={{ width: 'auto', height: 'auto', color: '#fff' }}>
                    <div> {item.title} </div>
                    <div>告警时间： {item.time} </div>
                    <div>告警类型： {item.type} </div>
                    <div>告警等级： {item.level} </div>
                    <div>发生位置： {`${item.position[0]}E，${item.position[1]}N`} </div>
                  </div>),
                  offset: { x: 10, y: -30 }
                });
                infoWindow.open(map,item.position);
              }}
            />
          )
      }
    </GMap>
    <TitleBlock />
    <Drawer
      show={true}
      style={{ width: '400px', height: '800px', background: 'rgba(9, 21, 42, 0.8)', top: '12vh' }}
      direction="left"
    >
      <div style={{ width: '100%', height: '100%', padding: '20px' }}>
        <Route path="/traffic/alert" component={() => <Alert alertList={testAlertList}></Alert>} />
        <Route path="/traffic/jam" component={() => <Flow heatMapData={heatMapData} />} />
      </div>
    </Drawer>
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
