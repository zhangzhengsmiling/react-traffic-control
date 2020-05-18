import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import BarChart from '../../../components/bar-chart';
import CountDown from '../../../components/count-down';
import GMap from '../../../components/map';
import Drawer from '../../../components/drawer';

import "./style.scss";

declare const AMap;
declare const Loca;
// const CENTER_WESTLAKE: [number, number] = [120.04819, 30.243851];
const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];

let _map = null;

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

const flowDetail = {
  roadName: '路口1',
  peakField: '8:00 - 9:00',
  peakValue: 200,
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

const random = (index) => ({
  'queue_len': (Math.random() * 200).toFixed(0),
  'inter_name': `name-${index}`,
  'lng': (120.056033 + Math.random() * 0.05 - 0.025).toFixed(4),
  'lat': (30.270448 + Math.random() * 0.05 - 0.025).toFixed(4),
})

const genRandomHotMap = (amount) => {
  return new Array(amount).fill('').map((item, index) => {
    return random(index);
  })
}

const Jam = (props) => {
  const [detail, setDetail] = useState(flowDetail);
  const [layers, setLayers] = useState([]);
  const [gMapOption] = useState({ center: CENTER_XIXISHIDI, zoom: 14 });
  const [heatMapData, setHeatMapData] = useState([]);


  useEffect(() => {
    const heatMapData = genRandomHotMap(200);
    fetch('/mock/heatmap.json')
      .then(res => res.json())
      .then(res => {
        setHeatMapData(heatMapData);
      })
  }, [])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDetail(prev => ({
  //       ...prev,
  //       roadName: '路口' + Math.random(),
  //     }))
  //     // console.log(_map, data)
  //     // renderHeatMap(_map, heatMapData);
  //   }, 3000);
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, []);
  return <>
    <GMap
      appKey="264957655c49306d2b11298a1f30cabf"
      className="g-map"
      onCompleted={(map) => {
        let layers = [];
        _map = map;
          renderHeatMap(map, heatMapData)
          layers = [
            new AMap.TileLayer(),
          ];
        setLayers(layers)
      }}
      viewMode="3D"
      pitch={50}
      center={gMapOption.center}
      zoom={gMapOption.zoom}
      layers={layers}
    />
    <Drawer
      show={true}
      style={{ width: '400px', height: '800px', background: 'rgba(9, 21, 42, 0.8)', top: '12vh', padding: '20px' }}
      direction="left"
    >
      <div className="jam" >
        <div className="sub-title">实时车流Top10</div>
        <div className="jam-realtime-flow">
          <div className="title-wrapper">
            <Row>
              <Col className="left" span={6}>  </Col>
              <Col className="middle" span={12}>路口名称</Col>
              <Col className="right" span={6}>车流量</Col>
            </Row>
          </div>
          <div style={{ height: '160px', overflowY: 'scroll' }}>
            {
              heatMapData
                .filter(item => item.queue_len > 180)
                .sort((a, b) => b.queue_len - a.queue_len)
                .slice(0, 10)
                .map((item, index) => {
                return <div className="heat-item" key={`heat-item-${index}`}>
                  <Row>
                    <Col className="left" span="6"> {index} </Col>
                    <Col className="middle" span="12"> {item.inter_name} </Col>
                    <Col className="right" span="6" style={{ textAlign: 'right' }}> {item.queue_len} </Col>
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
            callback={(a, b) => {
              renderHeatMap(_map, heatMapData);
              setDetail(prev => ({
                ...prev,
                roadName: b.x,
              }))
          }}
          />
          <div style={{ width: '100%', height: '260px' }}>
            <div style={{ color: '#fff', fontSize: '16px', marginTop: '12px' }}> {detail.roadName} </div>
            <Row gutter={20}>
              <Col span={10} style={{ color: '#fff' }}>
                <div style={{ width: 'auto', height: '100%', background: 'rgb(25, 48, 92)', paddingTop: '40px' }}>
                  <div style={{ fontSize: '12px', textAlign: 'center' }}>当日车流峰值(每小时)</div>
                  <div style={{ textAlign: 'center', margin: '16px 0' }}>
                    <CountDown
                      style={{ textAlign: 'center', fontSize: '22px' }}
                      start={0}
                      value={detail.peakValue}
                      mapfn={parseInt}
                    />
                  </div>
                  <div style={{ fontSize: '12px', textAlign: 'center' }}>峰值时间段</div>
                  <div style={{ textAlign: 'center', fontSize: '20px', margin: '16px 0' }}> {detail.peakField} </div>
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
    </Drawer>
  </>
}

export default Jam;
