import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, message } from 'antd';
// import { renderToString } from 'react-dom/server';
import moment from 'moment';

import BarChart from '../../../components/bar-chart';
import CountDown from '../../../components/count-down';
import GMap from '../../../components/map';
import Drawer from '../../../components/drawer';
import Marker from '../../../components/map/marker';


import "./style.scss";

declare const AMap;
declare const Loca;
// const CENTER_WESTLAKE: [number, number] = [120.04819, 30.243851];
const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];

let _map = null;

// const deviceOverview =  {
//   legend: ['车流量'],
//   xAxis: ['路口1', '路口2', '路口3', '路口4'],
//   yAxis: [
//     'count'
//   ],
//   data: [
//     [400, 482, 634, 588]
//   ]
// }

const flowDetail = {
  roadName: '--',
  peakField: '----',
  peakValue: 1,
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

const color = [
  [ { offset: 0, color: 'rgb(238, 89, 72)' }, { offset: 1, color: 'rgba(238, 89, 72, 0)'} ],
  [ { offset: 0, color: 'rgb(230, 174, 62)' }, { offset: 1, color: 'rgba(230, 174, 62, 0)' } ] ,
  [ { offset: 0, color: 'rgb(28, 195, 179)' }, { offset: 1, color: 'rgba(28, 195, 179, 0)' } ]
];

const style = { width: '360px', height: '200px', background: 'rgb(25, 48, 92)' };

const Jam = (props) => {
  const [detail, setDetail] = useState(flowDetail);
  const [layers, setLayers] = useState([]);
  const [gMapOption, setGMapOption] = useState({ zoom: 14 });
  const [heatMapData, setHeatMapData] = useState([]);
  const [barChartData, setBarChartData] = useState({ legend: [], xAxis: [], yAxis: [], data: [[]]});
  const [details, setDetails] = useState([])
  const [intersections, setIntersections] = useState([]);

  useEffect(() => {
    fetch('/jam/intersection').then(res => res.json())
      .then(res => {
        const { data, result, message } = res;
        if(result) {
          setIntersections(data);
          const barChartData =  {
            legend: ['车流量'],
            xAxis: data.map(item => item.name),
            yAxis: [
              'count'
            ],
            data: [
              data.map(item => item.flow_count),
            ]
          }
          setBarChartData(barChartData);
          const heatMapData = genRandomHotMap(200)
          setHeatMapData(heatMapData);
          return data;
        } else {
          message.error(message);
          return undefined;
        }
      })
      .then(data => {
        if(data) {
          const details = Promise.all(
            data.map(item => fetch(`/jam/intersection_flow?id=${item.id}&date=${moment().format('YYYY-MM-DD')}`)
              .then(res => res.json()))
          )
          return details;
        }
        return undefined;
      })
      .then(data => {
        if(data) {
          console.log('line 130-----')
          console.log(data);
        }
      })
      .catch(err => message.error(err.message));

  }, [])
  
  const callback = useCallback((index, target) => {
    console.log(index)
    setDetail(prev => {
      let details = [];
      setDetails(prev => {
        details = prev;
        // console.log(details)
        return prev;
      })
      return details[index]
    })
    setHeatMapData(prev => {
      renderHeatMap(_map, prev);
      return prev;
    })
    // setDetails
  }, ['heatMapData'])

  useEffect(() => {
    setTimeout(() => {
      setDetails([{
        roadName: '路口1',
        peakField: '09:00 - 10:00',
        peakValue: 1829,
      },{
        roadName: '路口2',
        peakField: '8:00 - 9:00',
        peakValue: 1999,
      },{
        roadName: '路口3',
        peakField: '8:00 - 9:00',
        peakValue: 4250,
      },{
        roadName: '路口4',
        peakField: '11:00 - 12:00',
        peakValue: 600,
      }])
    }, 1000)
  }, [])

  return <div className="jam">
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
      center={CENTER_XIXISHIDI}
      zoom={gMapOption.zoom}
      layers={layers}
      onZoomEnd={(option) => {
        setGMapOption({
          ...gMapOption,
          zoom: option.zoom,
        })
      }}
    >
      {/* {
      intersections
          // .filter(item => item.position)
          .map((item, index) => <Marker
          key={`intersection-${index}`}
          position={CENTER_XIXISHIDI}
          content={
            <div className="marker-intersection">
              <div className="circle" style={{ background: 'red'}} >
                <div style={{ width: '100%', height: '100%', background: 'rgb(22, 55, 101)', borderRadius: '50%', lineHeight: '30px', textAlign: 'center', color: '#fff', fontSize: '20px' }}>P</div>
              </div>
              <div className="bar" />
              <div className="dot" />
            </div>
          }
          onClick={(e, map) => {

            console.log(item.position)
            var infoWindow = new AMap.InfoWindow({
              anchor: 'middle-left',
              content: renderToString(<div className="parking-infowindow">
                <div className="parking-infowindow-title"> {item.name} </div>
                <div className="parking-infowindow-container flex parking-overview">
                  <div className="item">
                    <div className="label">总车位数</div>
                    <div className="value"> 1 </div>
                  </div>
                  <div className="item">
                    <div className="label">剩余车位数</div>
                    <div className="value"> 2 </div>
                  </div>
                  <div className="item">
                    <div className="label">当日入闸数</div>
                    <div className="value"> 3 </div>
                  </div>
                  <div className="item">
                    <div className="label">当日出闸数</div>
                    <div className="value"> 4 </div>
                  </div>
                </div>
                <div className="parking-infowindow-container">
                  <span className="sub-title">停车场饱和度</span>
                  <div id="percent-chart" />
                </div>
                <div className="parking-infowindow-container">
                  <span className="sub-title">停车场出入闸趋势</span>
                  <div id="line-chart" />
                </div>
              </div>),
              offset: { x: 15, y: -100 }
            });
            infoWindow.open(map, item.position);
            // setTimeout(() => {
            //   const percentChart = document.querySelector('#percent-chart');
            //   const lineChart = document.querySelector('#line-chart');
            //   if(percentChart) {
            //     renderPercentChart(percentChart, saturation);
            //   }
            //   if(lineChart) {
            //     renderLineChart(lineChart);
            //   }
            // }, 50)
          }}
        />
          )
      } */}
    </GMap>
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
              intersections
                // .filter(item => item.queue_len > 180)
                .sort((a, b) => b.queue_len - a.queue_len)
                // .slice(0, 10)
                .map((item, index) => {
                return <div className="heat-item" key={`heat-item-${index}`}>
                  <Row>
                    <Col className="left" span="6"> {index + 1} </Col>
                    <Col className="middle" span="12"> {item.name} </Col>
                    <Col className="right" span="6" style={{ textAlign: 'right' }}> {item.flow_count} </Col>
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
            style={style}
            data={barChartData}
            color={color}
            callback={callback}
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
  </div>
}

export default Jam;
